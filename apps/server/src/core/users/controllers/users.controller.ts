import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ChangeRatingDto } from '@tennis-stats/dto';
import { EPermission, IUser } from '@tennis-stats/types';
import GetRatingHistoryQuery from '../../../../../../libs/dto/src/lib/user/get-rating-history.query';
import { CurrentUser, Permissions } from '../../../auth/decorators';
import { IdParam } from '../../../common/decorators';
import UsersRepository from '../../../repositories/users.repository';
import UserStatsService from '../services/user-stats.service';

import UsersService from '../services/users.service';

@Controller('users')
class UsersController {
  constructor(
    private usersService: UsersService,
    private userStatsService: UserStatsService,
    private usersRepository: UsersRepository
  ) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/me')
  getMe(@CurrentUser() me: IUser) {
    return me;
  }

  @Get('/:id/common-stats')
  getCommonStats(@IdParam() userId: number) {
    return this.userStatsService.getCommonStats(userId);
  }

  @Get('/:id/rating-history')
  getUserRatingHistory(@IdParam() userId: number, @Query() query: GetRatingHistoryQuery) {
    return this.usersService.getUserRatingHistory(userId, query.year);
  }

  @Permissions([EPermission.USERS_CRUD])
  @Put('/:id/change-rating')
  changeUserRating(@Body() dto: ChangeRatingDto) {
    return this.usersService.changeRating(dto);
  }

  @Get('/:id')
  getUser(@IdParam() id: number) {
    return this.usersRepository.findById(id);
  }
}

export default UsersController;
