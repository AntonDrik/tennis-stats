import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ChangeRatingDto, GetRatingHistoryQuery } from '@tennis-stats/dto';
import { EPermission, IUser } from '@tennis-stats/types';
import { CurrentUser, Permissions } from '../../../auth/decorators';
import { IdParam } from '../../../common/decorators';
import UsersRepository from '../../../repositories/users.repository';
import UserCommonStatsService from '../services/user-common-stats.service';
import UserPairStatsService from '../services/user-pair-stats.service';

import UsersService from '../services/users.service';

@Controller('users')
class UsersController {
  constructor(
    private usersService: UsersService,
    private userStatsService: UserCommonStatsService,
    private userPairStatsService: UserPairStatsService,
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

  @Get('/:id/pair-stats')
  getPairStats(@IdParam() userId: number, @Query('opponentId') opponentId: number) {
    return this.userPairStatsService.getPairStats(userId, opponentId);
  }

  @Get('/:id/opponents')
  getOpponents(@IdParam() userId: number) {
    return this.userPairStatsService.getOpponentsList(userId);
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
