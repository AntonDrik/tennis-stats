import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateTourDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { Permissions } from '../../../auth/decorators';
import { TournamentById } from '../decorators/tournament.decorator';
import { TourById } from '../decorators/tour.decorator';
import TournamentService from '../services/tournament.service';

@Controller('tournaments/:tournamentId/tours')
class ToursController {
  constructor(private tournamentService: TournamentService) {}

  @Post('/add')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  addTour(
    @TournamentById('tournamentId') tournament: Tournament,
    @Body() dto: CreateTourDto
  ): Promise<Tour> {
    return this.tournamentService.addTour(tournament, dto);
  }

  @Delete('/:tourId')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  removeTour(
    @TournamentById('tournamentId') tournament: Tournament,
    @TourById() tour: Tour
  ) {
    return this.tournamentService.removeTour(tournament, tour);
  }
}

export default ToursController;
