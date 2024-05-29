import { IsBoolean } from 'class-validator';
import GameSetScoreDto from './game-set-score.dto';
import { Transform } from 'class-transformer';

class UpdateGameSetScoreDto extends GameSetScoreDto {

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  force: boolean

}

export default UpdateGameSetScoreDto
