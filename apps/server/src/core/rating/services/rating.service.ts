import { Injectable } from '@nestjs/common';
import { Match, RatingHistory, Tournament, User } from '@tennis-stats/entities';
import { allSynchronously, calculateRating, toFixedNumber } from '@tennis-stats/helpers';
import { EntityManager } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IWinnerLooser } from '../../../../../../libs/helpers/src/lib/match-helpers';

type TUserId = number;
type TNewRating = number;

@Injectable()
class RatingService {
  public async calculateAndSaveRating(tournament: Tournament, manager: EntityManager) {
    const data = this.calculateRating(tournament);

    for (const [userId, rating] of data.dictionary) {
      await manager.update(User, { id: userId }, { rating });
    }

    await allSynchronously(
      data.historyEntities.map((entity) => async () => {
        await manager.insert(RatingHistory, entity);
      })
    );
  }

  private calculateRating(tournament: Tournament) {
    const dictionary = new Map<TUserId, TNewRating>();
    const historyEntities: QueryDeepPartialEntity<RatingHistory>[] = [];

    const matches = tournament.tours.flatMap((tour) => tour?.matches);

    [...matches]
      .filter((match) => !match.isFictive && match.isFinished)
      .sort((a, b) => a.id - b.id)
      .forEach((match) => {
        const { winner, looser } =
          match.helpers.getWinnerLooser() as IWinnerLooser<Match>;

        const winnerRating = dictionary.get(winner.id) ?? winner.rating;
        const looserRating = dictionary.get(looser.id) ?? looser.rating;

        const rating = calculateRating(winnerRating, looserRating, match.totalScore);

        const newWinnerRating = toFixedNumber(winnerRating + rating.delta);
        const newLooserRating = toFixedNumber(looserRating - rating.delta);

        dictionary.set(winner.id, newWinnerRating);
        dictionary.set(looser.id, newLooserRating);

        historyEntities.push(
          {
            user: { id: winner.id },
            rating: newWinnerRating,
            visual: rating.visual,
            date: match.endDate,
            match,
          },
          {
            user: { id: looser.id },
            rating: newLooserRating,
            visual: rating.visual,
            date: match.endDate,
            match,
          }
        );
      });

    return { dictionary, historyEntities };
  }
}

export default RatingService;
