import { TPlayOffRound } from '@tennis-stats/types';
import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { IsPlayoffRoundValid } from '../custom-decorators/is-playoff-round-valid';

const rounds: TPlayOffRound[] = ['1/8', '1/4'];

class CreatePlayoffDto {
  @IsNumber({}, { each: true })
  activeUsersIds: number[];

  @IsOptional()
  @IsPlayoffRoundValid()
  @IsIn(rounds)
  round: TPlayOffRound;

  @IsNumber()
  @Max(5, { message: 'Максимум 5 сетов' })
  @Min(1, { message: 'Минимум 1 сет' })
  setsCount: number;
}

export default CreatePlayoffDto;
