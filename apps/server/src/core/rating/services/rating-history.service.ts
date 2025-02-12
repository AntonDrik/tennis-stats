import { Injectable } from '@nestjs/common';
import { RatingHistory, User } from '@tennis-stats/entities';
import { toFixedNumber } from '@tennis-stats/helpers';
import { IRawUserRatingHistory } from '@tennis-stats/types';
import { RatingHistoryRepository } from '../../../repositories';
import { getUserRating } from '../helpers/sql-queries';

@Injectable()
class RatingHistoryService {
  constructor(private repository: RatingHistoryRepository) {}

  public getUserRatingHistory(userId: number, year: string): Promise<IRawUserRatingHistory[]> {
    const query = getUserRating(userId, year);

    return this.repository.query(query);
  }

  public async getDailyRatingDiff(user: User): Promise<string> {
    const prevDayRecord = await this.repository.findPrevDayRating(user.id).catch(() => null);

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
