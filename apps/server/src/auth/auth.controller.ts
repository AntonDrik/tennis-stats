import { Body, Controller, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ChangePasswordDto, IdDto, LoginDto, RegistrationDto } from '@tennis-stats/dto';
import { EPermission, IAuthResponse, IUser } from '@tennis-stats/types';
import { Request, Response } from 'express';
import AuthService from './auth.service';
import { CurrentUser, Permissions, Public } from './decorators';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<IAuthResponse> {
    return this.authService.login(body, response);
  }

  @Public()
  @Post('/registration')
  registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }

  @Put('/change-password')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(dto);
  }

  @Permissions([EPermission.USERS_CRUD])
  @Post('/reset-password')
  resetPassword(@Body() dto: IdDto) {
    return this.authService.resetPassword(dto.id);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  refreshToken(
    @CurrentUser() user: IUser,
    @Res({ passthrough: true }) response: Response
  ): Promise<IAuthResponse> {
    return this.authService.setJwtCookie(user, response);
  }

  @Public()
  @Post('/logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<boolean> {
    return this.authService.logout(request, response);
  }
}

export default AuthController;
