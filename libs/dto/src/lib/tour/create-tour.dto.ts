import { ETourGenerator } from '@tennis-stats/types';
import { IsIn, IsNumber, Max, Min } from 'class-validator';

class CreateTourDto {
  @IsNumber()
  @Max(5, { message: 'Максимум 5 сетов' })
  @Min(1, { message: 'Минимум 1 сет' })
  setsCount: number;

  @IsIn([ETourGenerator.RANDOM, ETourGenerator.BY_RATING, ETourGenerator.BY_LEADERBOARD])
  pairsGenerator: ETourGenerator;
}

export default CreateTourDto;
