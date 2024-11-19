import { Controller, Get, Post } from '@nestjs/common';
import { IUser } from '@tennis-stats/types';
import { CurrentUser } from '../../auth/decorators';
import { IdParam } from '../../common/decorators';
import UsersRepository from './users.repository';

import UsersService from './users.service';

@Controller('users')
class UsersController {
  constructor(
    private usersService: UsersService,
    private usersRepository: UsersRepository
  ) {}

  @Get()
  getAllWithRating() {
    return this.usersService.getAllWithRating();
  }

  @Get('/me')
  getMe(@CurrentUser() me: IUser) {
    return me;
  }

  @Get('/:id')
  getUser(@IdParam() id: number) {
    return this.usersRepository.findById(id);
  }

  @Post('/reset-rating')
  resetRating() {
    return this.usersService.resetRating();
  }
}

export default UsersController;
