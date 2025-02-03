import { Injectable } from '@nestjs/common';
import { IGameSet, IMatch, ITour, ITournament, IUserCommonStats } from '@tennis-stats/types';
import { TournamentsRepository } from '../../../repositories';

interface ITournamentExtractedData {
  tours: ITour[];
  matches: IMatch[];
  gameSets: IGameSet[];
}

@Injectable()
class UserStatsService {
  constructor(private tournamentsRepository: TournamentsRepository) {}

  public async getCommonStats(userId: number): Promise<IUserCommonStats> {
    const allUserTournaments = await this.tournamentsRepository.findTournamentsByQuery({
      userId,
      withMatches: true,
    });

    const { tours, matches, gameSets } = this.extractData(allUserTournaments);

    return {
      winPercent: this.getWinPercent(gameSets, userId),
      allTournamentsCount: await this.getAllTournamentsCount(),
      playedTournamentsCount: allUserTournaments.length,
      playedMatchesCount: matches.length,
      playedPlayoffsCount: this.getPlayoffsCount(tours),
    };
  }

  private getPlayoffsCount(tours: ITour[]) {
    const stats: IUserCommonStats['playedPlayoffsCount'] = {
      '1/64': 0,
      '1/32': 0,
      '1/16': 0,
      '1/8': 0,
      '1/4': 0,
      '1/2': 0,
      '1/1': 0,
    };

    return tours.reduce((acc, curr) => {
      if (!curr.playOffStage) {
        return acc;
      }

      acc[curr.playOffStage] += 1;
      return acc;
    }, stats);
  }

  private getWinPercent(gameSets: IGameSet[], winnerId: number): number {
    const winsCount = gameSets.reduce((acc, curr) => {
      const { player1, player2 } = curr;

      const activePlayer = player1.user.id === winnerId ? player1 : player2;

      return acc + Number(activePlayer.isWinner);
    }, 0);

    const percent = (winsCount / gameSets.length) * 100;

    return Number(percent.toFixed(2));
  }

  private getAllTournamentsCount(): Promise<number> {
    return this.tournamentsRepository.count();
  }

  private extractData(userTournaments: ITournament[]): ITournamentExtractedData {
    const initial: ITournamentExtractedData = { tours: [], matches: [], gameSets: [] };

    return userTournaments.reduce((acc, curr) => {
      const tours = curr.tours;
      const matches = tours.flatMap((tour) => tour.matches);
      const gameSets = matches.flatMap((match) => match.gameSets);

      acc.tours.push(...tours);
      acc.matches.push(...matches);
      acc.gameSets.push(...gameSets);

      return acc;
    }, initial);
  }
}

export default UserStatsService;
