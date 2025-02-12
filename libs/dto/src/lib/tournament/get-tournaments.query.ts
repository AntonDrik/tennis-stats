import { ETournamentStatus } from '@tennis-stats/types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { IsTogetherOnly } from '../custom-decorators/is-together-only';

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

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  withJoinedUsers?: boolean;

  @IsOptional()
  @IsPositive()
  seasonId?: number;

  /**
   * !! Будут выбраны только матчи пользователя.
   */
  @IsOptional()
  @IsPositive()
  userId?: number;

  /**
   * !! Будут выбраны все матчи
   */
  @IsOptional()
  @IsPositive()
  registeredUserId?: number;
}

export default GetTournamentsQuery;
