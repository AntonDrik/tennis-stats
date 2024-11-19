import { ETournamentType } from '@tennis-stats/types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn } from 'class-validator';
import { CreateTourDto } from '../../index';

class StartTournamentDto extends CreateTourDto {
  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  handleRating: boolean;

  @IsIn([ETournamentType.ROUND_ROBIN, ETournamentType.SWISS_SYSTEM])
  tournamentType: ETournamentType;
}

export default StartTournamentDto;
