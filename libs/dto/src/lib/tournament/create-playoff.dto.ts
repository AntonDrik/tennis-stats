import { TPlayOffStage } from '@tennis-stats/types';
import { IsIn, IsNumber, Max, Min } from 'class-validator';
import { IsPlayoffRoundValid } from '../custom-decorators/is-playoff-round-valid';

const stages: TPlayOffStage[] = ['1/8', '1/4'];

class CreatePlayoffDto {
  @IsNumber({}, { each: true })
  activeUsersIds: number[];

  @IsPlayoffRoundValid()
  @IsIn(stages)
  stage: TPlayOffStage;

  @IsNumber()
  @Max(5, { message: 'Максимум 5 сетов' })
  @Min(1, { message: 'Минимум 1 сет' })
  setsCount: number;
}

export default CreatePlayoffDto;
