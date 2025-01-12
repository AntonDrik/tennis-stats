import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateTourDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { Permissions } from '../../../auth/decorators';
import { TourById } from '../decorators/tour.decorator';
import { TournamentById } from '../decorators/tournament.decorator';
import ToursService from '../services/tour.service';

@Controller('tournaments/:tournamentId/tours')
class ToursController {
  constructor(private toursService: ToursService) {}

  @Post('/add')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  addTour(
    @TournamentById('tournamentId') tournament: Tournament,
    @Body() dto: CreateTourDto
  ) {
    return this.toursService.addTour(tournament, dto);
  }

  @Delete('/:tourId')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  removeTour(
    @TournamentById('tournamentId') tournament: Tournament,
    @TourById() tour: Tour
  ) {
    return this.toursService.removeTour(tournament, tour);
  }
}

export default ToursController;
