import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto, LoginDto, RegistrationDto } from '@tennis-stats/dto';
import { User, UserAuth } from '@tennis-stats/entities';
import { IAuthResponse, ITokenPayload, IUser, RequiredFields } from '@tennis-stats/types';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { v } from 'vitest/dist/reporters-5f784f42';
import { InvalidCredentialsException, UserExistException } from '../common/exceptions';
import { RatingHistoryService } from '../core/rating';
import { UsersAuthRepository, UsersRepository } from '../repositories';
import {
  refreshCookieOptions,
  accessCookieOptions,
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  ACCESS_COOKIE_LIFE_TIME,
  REFRESH_COOKIE_LIFE_TIME,
} from './constants';

@Injectable()
class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private userAuthRepository: UsersAuthRepository,
    private ratingHistoryService: RatingHistoryService,
    private jwtService: JwtService
  ) {}

  public async login(dto: LoginDto, response: Response): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByLogin(dto.login);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    await this.validatePassword(dto.password, user.auth?.password);

    return this.setJwtCookie(user, response);
  }

  public async registration(dto: RegistrationDto): Promise<void> {
    const foundUser = await this.usersRepository.findByLogin(dto.login);

    if (foundUser) {
      throw new UserExistException();
    }

    const auth = new UserAuth();
    auth.login = dto.login;
    auth.password = await bcrypt.hash(dto.password, 10);

    const user = new User();
    user.nickname = dto.nickname;
    user.rating = dto.rating;
    user.auth = auth;

    await user.save();

    await this.ratingHistoryService.createHistoryItem(user);
  }

  public async changePassword(dto: ChangePasswordDto): Promise<void> {
    const foundUser = (await this.usersRepository.findById(dto.userId, {
      relations: ['auth'],
    })) as RequiredFields<User, 'auth'>;

    await this.validatePassword(
      dto.oldPassword,
      foundUser.auth?.password,
      'Неверный текущий пароль'
    );

    foundUser.auth.password = await bcrypt.hash(dto.newPassword, 10);
    await foundUser.save();
  }

  public async resetPassword(userId: number): Promise<void> {
    const foundUser = (await this.usersRepository.findById(userId, {
      relations: ['auth'],
    })) as RequiredFields<User, 'auth'>;

    foundUser.auth.password = await bcrypt.hash('1234', 10);
    await foundUser.save();
  }

  public async logout(request: Request, response: Response): Promise<boolean> {
    const accessToken = request.cookies[ACCESS_COOKIE_NAME];
    const payload = (await this.jwtService.decode(accessToken)) as ITokenPayload;

    if (Number.isFinite(payload?.userId)) {
      await this.userAuthRepository.updateRefreshToken(payload.userId, null);
    }

    response.clearCookie(ACCESS_COOKIE_NAME, accessCookieOptions(ACCESS_COOKIE_LIFE_TIME));
    response.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions(REFRESH_COOKIE_LIFE_TIME));

    return true;
  }

  public async setJwtCookie(user: IUser, response: Response): Promise<IAuthResponse> {
    const tokenPayload: ITokenPayload = { userId: user.id };

    const access_token = this.jwtService.sign(tokenPayload, {
      expiresIn: ACCESS_COOKIE_LIFE_TIME,
    });

    const refresh_token = this.jwtService.sign(tokenPayload, {
      expiresIn: REFRESH_COOKIE_LIFE_TIME,
    });

    await this.userAuthRepository.updateRefreshToken(user.id, refresh_token);

    response.cookie(ACCESS_COOKIE_NAME, access_token, accessCookieOptions(ACCESS_COOKIE_LIFE_TIME));
    response.cookie(
      REFRESH_COOKIE_NAME,
      refresh_token,
      refreshCookieOptions(REFRESH_COOKIE_LIFE_TIME)
    );

    return { user, accessToken: access_token };
  }

  private async validatePassword(
    dtoPassword: string,
    passwordFromDB: string | undefined,
    errorMessage?: string
  ): Promise<void> {
    if (passwordFromDB === undefined) {
      throw new InvalidCredentialsException(errorMessage);
    }

    const isValidPassword = await bcrypt.compare(dtoPassword, passwordFromDB);

    if (!isValidPassword) {
      throw new InvalidCredentialsException(errorMessage);
    }
  }
}

export default AuthService;
