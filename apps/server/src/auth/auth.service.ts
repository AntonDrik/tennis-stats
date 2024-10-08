import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegistrationDto } from '@tennis-stats/dto';
import { User, UserAuth } from '@tennis-stats/entities';
import { IAuthResponse, ITokenPayload, IUser } from '@tennis-stats/types';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { InvalidCredentialsException, UserExistException } from '../common/exceptions';
import { UsersAuthRepository, UsersRepository } from '../core/users';
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
    private jwtService: JwtService
  ) {}

  public async login(dto: LoginDto, response: Response): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByLogin(dto.login);

    if (!user || !user.auth) {
      throw new InvalidCredentialsException();
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.auth.password);

    if (!isValidPassword) {
      throw new InvalidCredentialsException();
    }

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
  }

  public async logout(request: Request, response: Response): Promise<boolean> {
    const accessToken = request.cookies[ACCESS_COOKIE_NAME];
    const payload = (await this.jwtService.decode(accessToken)) as ITokenPayload;

    await this.userAuthRepository.updateRefreshToken(payload?.userId, null);

    response.clearCookie(
      ACCESS_COOKIE_NAME,
      accessCookieOptions(ACCESS_COOKIE_LIFE_TIME)
    );
    response.clearCookie(
      REFRESH_COOKIE_NAME,
      refreshCookieOptions(REFRESH_COOKIE_LIFE_TIME)
    );

    return true;
  }

  public async setJwtCookie(user: IUser, response: Response): Promise<IAuthResponse> {
    const tokenPayload: ITokenPayload = { userId: user.id };
    const access_token = this.jwtService.sign(tokenPayload, {
      expiresIn: ACCESS_COOKIE_LIFE_TIME,
    });
    const refresh_token = this.jwtService.sign(
      {},
      { expiresIn: REFRESH_COOKIE_LIFE_TIME }
    );

    await this.userAuthRepository.updateRefreshToken(user.id, refresh_token);

    response.cookie(
      ACCESS_COOKIE_NAME,
      access_token,
      accessCookieOptions(ACCESS_COOKIE_LIFE_TIME)
    );
    response.cookie(
      REFRESH_COOKIE_NAME,
      refresh_token,
      refreshCookieOptions(REFRESH_COOKIE_LIFE_TIME)
    );

    return { user, accessToken: access_token };
  }
}

export default AuthService;
