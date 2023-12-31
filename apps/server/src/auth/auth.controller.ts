import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { LoginDto } from '@tennis-stats/dto'
import { IAuthResponse, IUser } from '@tennis-stats/types'
import { Request, Response } from 'express'
import AuthService from './auth.service'
import { CurrentUser, Public } from './decorators'
import JwtRefreshGuard from './guards/jwt-refresh.guard'


@Controller('auth')
class AuthController {
    
    constructor(private authService: AuthService) {}
    
    @Public()
    @Post('/login')
    login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<IAuthResponse> {
        return this.authService.login(body, response)
    }
    
    @Public()
    @UseGuards(JwtRefreshGuard)
    @Post('/refresh')
    refreshToken(
        @CurrentUser() user: IUser,
        @Res({ passthrough: true }) response: Response
    ): Promise<IAuthResponse> {
        return this.authService.setJwtCookie(user, response)
    }
    
    @Public()
    @Post('/logout')
    logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ): Promise<boolean> {
        return this.authService.logout(request, response)
    }
    
}

export default AuthController