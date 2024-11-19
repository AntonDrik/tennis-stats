import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@tennis-stats/entities';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../../core/users';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtRefreshStrategy.getTokenFromCookie]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request): Promise<User> {
    const refreshToken = JwtRefreshStrategy.getTokenFromCookie(request);
    const user = await this.usersRepository.findByRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return user;
  }

  static getTokenFromCookie(request: Request) {
    return request?.cookies?.Refresh;
  }
}
