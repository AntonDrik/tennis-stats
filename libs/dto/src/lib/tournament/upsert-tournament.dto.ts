import { Max, Min } from 'class-validator';

class UpsertTournamentDto {
  @Max(32, { message: 'Максимум 32 игроков' })
  @Min(2, { message: 'Минимум 2 игрока' })
  playersCount: number;
}

export default UpsertTournamentDto;
