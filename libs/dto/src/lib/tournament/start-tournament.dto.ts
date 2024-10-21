import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { CreateTourDto } from '../../index';

class StartTournamentDto extends CreateTourDto {
  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  handleRating: boolean;
}

export default StartTournamentDto;
