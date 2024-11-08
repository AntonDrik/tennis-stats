import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@tennis-stats/entities';
import { ITokenPayload } from '@tennis-stats/types';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../../core/users';


@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {

  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtRefreshStrategy.getTokenFromCookie]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY')
    });
  }

  async validate(payload: ITokenPayload): Promise<User> {
    return await this.usersRepository.findById(
      payload.userId,
      new UnauthorizedException('Ошибка авторизации')
    );
  }

  static getTokenFromCookie(request: Request) {
    return request?.cookies?.Refresh;
  }
}
