import { Injectable } from '@nestjs/common';
import { Tournament } from '@tennis-stats/entities';
import { IExtendedPairMatch, IOpponent, IUserPairStats } from '@tennis-stats/types';
import { TournamentsRepository } from '../../../repositories';
import UserStatsService from './stats.abstract.service';

@Injectable()
class UserPairStatsService extends UserStatsService {
  constructor(private tournamentsRepository: TournamentsRepository) {
    super();
  }

  public async getOpponentsList(userId: number): Promise<IOpponent[]> {
    const allUserTournaments = await this.tournamentsRepository.findTournamentsByQuery({ userId });

    const { matches } = this.extractData(allUserTournaments);

    const opponentsDict = matches.reduce((acc, curr) => {
      const opponent = curr.user1.id === userId ? curr.user2 : curr.user1;

      if (!acc[opponent.id]) {
        acc[opponent.id] = { gamesCount: 1, user: opponent };
      } else {
        acc[opponent.id].gamesCount += 1;
      }

      return acc;
    }, {} as Record<number, IOpponent>);

    return Object.values(opponentsDict)
      .map((data) => data)
      .sort((a, b) => b.gamesCount - a.gamesCount);
  }

  public async getPairStats(userId: number, opponentId: number): Promise<IUserPairStats> {
    const allUserTournaments = await this.tournamentsRepository.findTournamentsByQuery({
      userId,
      opponentId,
    });

    const { matches } = this.extractData(allUserTournaments);

    return {
      winPercent: this.getWinPercent(matches, userId),
      playedPlayoffsCount: matches.filter((match) => match.isPlayoff).length,
      playedToursCount: matches.filter((match) => !match.isPlayoff).length,
      matches: this.getMatches(allUserTournaments),
    };
  }

  private getMatches(tournaments: Tournament[]): IExtendedPairMatch[] {
    const matches = tournaments.flatMap((tournament) => {
      return tournament.tours.flatMap((tour) => {
        return tour.matches.flatMap((match) => ({
          ...match,
          tournament: { id: tournament.id, date: tournament.date },
          tour,
        }));
      });
    });

    return matches.sort((a, b) => b.tournament.id - a.tournament.id || b.tour.id - a.tour.id);
  }
}

export default UserPairStatsService;
