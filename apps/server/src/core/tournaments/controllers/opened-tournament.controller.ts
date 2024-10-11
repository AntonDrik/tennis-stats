import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  CreatePlayoffDto,
  IdDto,
  StartTournamentDto,
  TournamentRegistrationDto,
  UpsertTournamentDto,
} from '@tennis-stats/dto';
import { User } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { CurrentUser, Permissions, Public } from '../../../auth/decorators';
import { ForbiddenException } from '../../../common/exceptions';
import OpenedTournamentService from '../services/opened-tournament.service';
import PlayoffService from '../services/playoff.service';

@Controller('tournaments/opened')
class OpenedTournamentController {
  constructor(
    private openedTournamentService: OpenedTournamentService,
    private playoffService: PlayoffService
  ) {}

  @Public()
  @Get()
  getOpenedTournament() {
    return this.openedTournamentService.getOpenedToRegistrationTournament();
  }

  @Post('/start')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  startTournament(@Body() dto: StartTournamentDto) {
    return this.openedTournamentService.startTournament(dto);
  }

  @Post('/finish')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  finishTournament() {
    return this.openedTournamentService.finishTournament();
  }

  @Put('/edit')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  editOpenedTournament(@Body() dto: UpsertTournamentDto) {
    return this.openedTournamentService.editTournament(dto);
  }

  @Delete('/delete')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  deleteTournament() {
    return this.openedTournamentService.deleteTournament();
  }

  @Post('/create-playoff')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  createPlayoff(@Body() dto: CreatePlayoffDto) {
    return this.playoffService.createPlayoff(dto);
  }

  @Delete('/remove-playoff')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  removePlayoff() {
    return this.playoffService.removePlayoff();
  }

  @Post('/register-user')
  registerUsersOnTournament(
    @CurrentUser() user: User,
    @Body() dto: TournamentRegistrationDto
  ) {
    const isAdmin = user.permissions?.find(
      (permission) => permission.value === EPermission.TOURNAMENT_CRUD
    );

    if (!isAdmin && (dto.usersIds.length > 1 || dto.usersIds[0] !== user.id)) {
      throw new ForbiddenException();
    }

    return this.openedTournamentService.registerUsersOnTournament(dto);
  }

  @Post('/unregister-user')
  unregisterUsersFromTournament(@CurrentUser() user: User, @Body() dto: IdDto) {
    const isAdmin = user.permissions?.find(
      (permission) => permission.value === EPermission.TOURNAMENT_CRUD
    );

    if (!isAdmin && dto.id !== user.id) {
      throw new ForbiddenException();
    }

    return this.openedTournamentService.unregisterUserFromTournament(dto);
  }
}

export default OpenedTournamentController;
