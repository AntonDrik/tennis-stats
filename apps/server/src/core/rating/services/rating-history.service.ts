import { Injectable } from '@nestjs/common';
import { RatingHistory, User } from '@tennis-stats/entities';
import { toFixedNumber } from '@tennis-stats/helpers';
import { RatingHistoryRepository } from '../../../repositories';

@Injectable()
class RatingHistoryService {
  constructor(private repository: RatingHistoryRepository) {}

  // public getHistoryForAll(): Promise<IAvgRatingByDay[]> {
  //   const query = getAvgRatingByDaysQuery();
  //
  //   return this.repository.executeQuery<IAvgRatingByDay[]>(query);
  // }

  // public getHistoryForUser(userId: number): Promise<IAvgRatingByDay[]> {
  //   const query = getAvgRatingByDaysQuery(userId);
  //
  //   return this.repository.executeQuery<IAvgRatingByDay[]>(query);
  // }

  public getUserRatingHistory(userId: number, year: string) {
    return this.repository.query(`WITH ranked_messages AS (SELECT r.date, r.rating,
                                                                  ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(r.date, '%Y%m%d') ORDER BY r.id DESC) AS rn
                                                           FROM rating_history as r
                                                                  LEFT JOIN \`tennis-stats\`.user u on u.id = r.userId
                                                           WHERE u.id = ${userId}
                                                             AND YEAR(r.date) = ${year})
                                  SELECT *
                                  FROM ranked_messages
                                  WHERE rn = 1;`);
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
