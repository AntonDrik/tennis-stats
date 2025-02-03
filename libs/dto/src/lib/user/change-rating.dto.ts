import { IsPositive } from 'class-validator';

class ChangeRatingDto {
  @IsPositive()
  userId: number;

  @IsPositive()
  newRating: number;
}

export default ChangeRatingDto;
