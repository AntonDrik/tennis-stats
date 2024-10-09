import { Injectable } from '@nestjs/common';
import { RatingHistory, User } from '@tennis-stats/entities';
import { IAvgRatingByDay } from '@tennis-stats/types';
import { EntityManager } from 'typeorm';
import RatingHistoryRepository from '../repositories/history.repository';
import { getAvgRatingByDaysQuery } from '../repositories/sql';

@Injectable()
class RatingHistoryService {
  constructor(private repository: RatingHistoryRepository) {}

  getHistoryForAll(): Promise<IAvgRatingByDay[]> {
    const query = getAvgRatingByDaysQuery();

    return this.repository.executeQuery<IAvgRatingByDay[]>(query);
  }

  getHistoryForUser(userId: number): Promise<IAvgRatingByDay[]> {
    const query = getAvgRatingByDaysQuery(userId);

    return this.repository.executeQuery<IAvgRatingByDay[]>(query);
  }

  async addRatingToHistory(user: User, tournamentDate: Date, manager?: EntityManager) {
    const history = new RatingHistory();

    history.user = user;
    history.rating = user.rating;
    history.date = tournamentDate;

    if (manager) {
      await manager.save(RatingHistory, history);

      return;
    }

    await history.save();
  }

  async getDailyRatingDiff(user: User): Promise<string> {
    const prevDayRecord = await this.repository
      .findPrevDayRating(user.id)
      .catch(() => null);

    const prevRating = prevDayRecord?.[0]?.rating;

    if (!prevRating) {
      return '+0';
    }

    const ratingDiff = user.rating - prevRating;

    return ratingDiff > 0 ? `+${ratingDiff}` : String(ratingDiff);
  }
}

export default RatingHistoryService;
