import { ETournamentStatus } from '@tennis-stats/types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';

const tournamentStatus = [
  ETournamentStatus.ACTIVE,
  ETournamentStatus.REGISTRATION,
  ETournamentStatus.FINISHED,
];

class GetTournamentsQuery {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id?: number | string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  sortByDate?: boolean;

  @IsOptional()
  @IsIn(tournamentStatus)
  status?: ETournamentStatus[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  withMatches?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  withLeaderboard?: boolean;
}

export default GetTournamentsQuery;
