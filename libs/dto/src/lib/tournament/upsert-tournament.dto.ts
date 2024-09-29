import { Max, Min } from 'class-validator';

class UpsertTournamentDto {
  @Max(30, { message: 'Максимум 30 игроков' })
  @Min(2, { message: 'Минимум 2 игрока' })
  playersCount: number;
}

export default UpsertTournamentDto;
