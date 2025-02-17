import { Injectable } from '@nestjs/common';
import { ITour, IUserCommonStats, TPlacesStats, TPlayedPlayoffsStats } from '@tennis-stats/types';
import { TournamentsRepository } from '../../../repositories';
import { LeaderboardService } from '../../leaderboard';
import UserStatsService from './stats.abstract.service';

@Injectable()
class UserCommonStatsService extends UserStatsService {
  constructor(
    private tournamentsRepository: TournamentsRepository,
    private leaderboardService: LeaderboardService
  ) {
    super();
  }

  public async getCommonStats(userId: number): Promise<IUserCommonStats> {
    const allUserTournaments = await this.tournamentsRepository.findTournamentsByQuery({ userId });

    const { tours, matches } = this.extractData(allUserTournaments);

    return {
      winPercent: this.getWinPercent(matches, userId),
      allTournamentsCount: await this.getAllTournamentsCount(),
      playedTournamentsCount: allUserTournaments.length,
      playedMatchesCount: matches.length,
      playedPlayoffsCount: this.getPlayoffsCount(tours),
      placesStats: await this.getPlacesStats(userId),
    };
  }

  private getPlayoffsCount(tours: ITour[]): TPlayedPlayoffsStats | null {
    let isEmptyStats = true;
    const stats: IUserCommonStats['playedPlayoffsCount'] = {
      '1/64': 0,
      '1/32': 0,
      '1/16': 0,
      '1/8': 0,
      '1/4': 0,
      '1/2': 0,
      '1/1': 0,
    };

    const result = tours.reduce((acc, curr) => {
      if (!curr.playOffStage) {
        return acc;
      }

      acc[curr.playOffStage] += 1;
      isEmptyStats = false;

      return acc;
    }, stats);

    return isEmptyStats ? null : result;
  }

  private getAllTournamentsCount(): Promise<number> {
    return this.tournamentsRepository.count();
  }

  private async getPlacesStats(userId: number): Promise<TPlacesStats> {
    const tournaments = await this.tournamentsRepository.findTournamentsByQuery({
      registeredUserId: userId,
      withMatches: true,
    });

    return tournaments.reduce((acc, curr) => {
      const leaderboard = this.leaderboardService.getPlayoffLeaderboard(curr);

      let place = leaderboard.findIndex((item) => item.user.id === userId);

      if (place === -1) {
        return acc;
      }

      place += 1;

      acc[place] = (acc[place] || 0) + 1;

      return acc;
    }, {} as TPlacesStats);
  }
}

export default UserCommonStatsService;
