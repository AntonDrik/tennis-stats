import { Transform } from 'class-transformer';
import { IsBoolean, Max, Min } from 'class-validator';

class UpsertTournamentDto {
  @Max(32, { message: 'Максимум 32 игроков' })
  @Min(2, { message: 'Минимум 2 игрока' })
  playersCount: number;

  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  attachSeason: boolean;
}

export default UpsertTournamentDto;
