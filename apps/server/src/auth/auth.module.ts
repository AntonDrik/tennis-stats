import { Module } from '@nestjs/common/decorators';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RatingModule } from '../core/rating';
import { UsersAuthRepository, UsersRepository } from '../repositories';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    RatingModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, UsersRepository, UsersAuthRepository],
  exports: [],
})
class AuthModule {}

export default AuthModule;
