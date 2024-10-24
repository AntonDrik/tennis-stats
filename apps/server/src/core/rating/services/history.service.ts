import { Injectable } from '@nestjs/common';
import { RatingHistory, User } from '@tennis-stats/entities';
import { toFixedNumber } from '@tennis-stats/helpers';
import { IAvgRatingByDay } from '@tennis-stats/types';
import RatingHistoryRepository from '../repositories/history.repository';
import { getAvgRatingByDaysQuery } from '../repositories/sql';

@Injectable()
class RatingHistoryService {
  constructor(private repository: RatingHistoryRepository) {}

  public getHistoryForAll(): Promise<IAvgRatingByDay[]> {
    const query = getAvgRatingByDaysQuery();

    return this.repository.executeQuery<IAvgRatingByDay[]>(query);
  }

  public getHistoryForUser(userId: number): Promise<IAvgRatingByDay[]> {
    const query = getAvgRatingByDaysQuery(userId);

    return this.repository.executeQuery<IAvgRatingByDay[]>(query);
  }

  public async getDailyRatingDiff(user: User): Promise<string> {
    const prevDayRecord = await this.repository
      .findPrevDayRating(user.id)
      .catch(() => null);

    const prevRating = prevDayRecord?.[0]?.rating;

    if (!prevRating) {
      return '0';
    }

    const ratingDiff = toFixedNumber(user.rating - prevRating, 1);

    return ratingDiff > 0 ? `+${ratingDiff}` : String(ratingDiff);
  }

  public async createHistoryItem(user: User) {
    const history = new RatingHistory();
    history.user = user;
    history.rating = user.rating;
    history.date = new Date();

    await history.save();
  }
}

export default RatingHistoryService;
