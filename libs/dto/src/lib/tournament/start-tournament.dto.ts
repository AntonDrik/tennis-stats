import { ETournamentType } from '@tennis-stats/types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmptyObject,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateTourDto } from '../../index';
import PlayoffStartOptionsDto from './playoff-start-options.dto';

class StartTournamentDto extends CreateTourDto {
  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  handleRating: boolean;

  @IsIn([
    ETournamentType.ROUND_ROBIN,
    ETournamentType.SWISS_SYSTEM,
    ETournamentType.PLAYOFF,
  ])
  tournamentType: ETournamentType;

  @ValidateIf((o) => o.tournamentType === ETournamentType.PLAYOFF)
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PlayoffStartOptionsDto)
  playoffOptions?: PlayoffStartOptionsDto;
}

export default StartTournamentDto;
