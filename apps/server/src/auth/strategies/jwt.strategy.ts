import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ITokenPayload } from '@tennis-stats/types'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Equal } from 'typeorm'
import { UsersRepository } from '../../core/users'


@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private configService: ConfigService,
        private usersRepository: UsersRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.getTokenFromCookie]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY')
        })
    }

    async validate(payload: ITokenPayload) {
        const user = await this.usersRepository.findOneBy({ id: Equal(payload.userId) })
        
        if (!user) {
            throw new UnauthorizedException('Пользователь не найден')
        }
        
        return user
    }

    static getTokenFromCookie(request: Request) {
        return request?.cookies?.Authentication
    }
}
