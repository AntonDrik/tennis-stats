import { TPlayOffStage } from '@tennis-stats/types';
import { IsIn, IsNumber } from 'class-validator';
import { IsPlayoffRoundValid } from '../custom-decorators/is-playoff-round-valid';

const stages: TPlayOffStage[] = ['1/8', '1/4'];

class PlayoffStartOptionsDto {
  @IsNumber({}, { each: true })
  activeUsersIds: number[];

  @IsPlayoffRoundValid()
  @IsIn(stages)
  stage: TPlayOffStage;
}

export default PlayoffStartOptionsDto;
