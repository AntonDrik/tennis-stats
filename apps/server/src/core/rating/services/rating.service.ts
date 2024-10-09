import { Injectable } from '@nestjs/common';
import { IWinnerLooser, Tournament, User } from '@tennis-stats/entities';
import { getRatingDelta } from '@tennis-stats/helpers';
import { EntityManager } from 'typeorm';
import RatingHistoryService from './history.service';

type TUserId = number;
type TNewRating = number;

@Injectable()
class RatingService {
  constructor(private ratingHistoryService: RatingHistoryService) {}

  calculateRating(tournament: Tournament) {
    const tournamentAvgRating = this.getTournamentAvgRating(tournament);
    const collection = new Map<TUserId, TNewRating>();

    const matches = tournament.tours.flatMap((tour) => tour?.matches);

    matches
      .filter((match) => !match.isFictive && match.isFinished)
      .forEach((match) => {
        const { winner, looser } = match.getWinnerLooser() as IWinnerLooser;

        const winnerRating = winner.rating;
        const looserRating = looser.rating;
        const matchScore = match.totalScore;

        const delta = getRatingDelta(
          winnerRating,
          looserRating,
          tournamentAvgRating,
          matchScore
        );

        collection.set(winner.id, (collection.get(winner.id) ?? winner.rating) + delta);
        collection.set(looser.id, (collection.get(looser.id) ?? looser.rating) - delta);
      });

    return collection;
  }

  async calculateAndSaveRating(tournament: Tournament, manager: EntityManager) {
    const ratingCollection = this.calculateRating(tournament);

    for (const [id, rating] of ratingCollection) {
      await manager.update(User, { id }, { rating });

      const user = await manager.findOneBy(User, { id });

      if (user) {
        await this.ratingHistoryService.addRatingToHistory(
          user,
          tournament.date,
          manager
        );
      }
    }
  }

  private getTournamentAvgRating(tournament: Tournament): number {
    const players = tournament.registeredUsers;

    return players.reduce((acc, curr) => acc + curr.rating, 0) / players.length;
  }
}

export default RatingService;
