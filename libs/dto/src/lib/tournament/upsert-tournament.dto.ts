import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, Max, Min } from 'class-validator';
import { IsTogetherOnly } from '../custom-decorators/is-together-only';

class UpsertTournamentDto {
  @Max(32, { message: 'Максимум 32 игроков' })
  @Min(2, { message: 'Минимум 2 игрока' })
  playersCount: number;

  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  attachSeason: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  @IsTogetherOnly<UpsertTournamentDto>('attachSeason')
  seasonFinal?: boolean;
}

export default UpsertTournamentDto;
