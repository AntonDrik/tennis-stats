import { Injectable } from '@nestjs/common';
import { Match, RatingHistory, Tournament, User } from '@tennis-stats/entities';
import { allSynchronously, calculateRating, toFixedNumber } from '@tennis-stats/helpers';
import { IWinnerLooser } from '@tennis-stats/types';
import { DataSource, EntityManager } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type TUserId = number;
type TNewRating = number;

@Injectable()
class RatingService {
  constructor(private dataSource: DataSource) {}

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

  // public async recalculateRating() {
  //   await this.dataSource.manager.transaction(async (manager) => {
  //     const allUsers = await manager.find(User);
  //     const allTournament = await manager.find(Tournament);
  //
  //     await manager.clear(RatingHistory);
  //
  //     await allSynchronously(
  //       allUsers.map((user) => async () => {
  //         await manager.update(User, { id: user.id }, { rating: 1000 });
  //       })
  //     );
  //
  //     await allSynchronously(
  //       allTournament.map((tournament) => async () => {
  //         const updatedTournament = await manager.findOneBy(Tournament, { id: tournament.id });
  //
  //         if (updatedTournament) {
  //           await this.calculateAndSaveRating(updatedTournament, manager);
  //         }
  //       })
  //     );
  //   });
  // }

  private calculateRating(tournament: Tournament) {
    const dictionary = new Map<TUserId, TNewRating>();
    const historyEntities: QueryDeepPartialEntity<RatingHistory>[] = [];

    const matches = tournament.tours.flatMap((tour) => tour?.matches);

    [...matches]
      .filter((match) => !match.isFictive && match.isFinished)
      .sort((a, b) => a.id - b.id)
      .forEach((match) => {
        const { winner, looser } = match.helpers.getWinnerLooser() as IWinnerLooser<Match>;

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
