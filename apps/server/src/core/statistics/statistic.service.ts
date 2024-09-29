import { Injectable } from '@nestjs/common/decorators';
import { GetPairStatisticQuery } from '@tennis-stats/dto';
import { maxInCollection, avgOfSet } from '@tennis-stats/helpers';
import {
  IAvailableDates,
  ICommonStatistic,
  IPairStatistic,
  TScoreCaption,
} from '@tennis-stats/types';
import humanizeDuration from 'humanize-duration';
import GameSetRepository from '../match/repositories/game-set.repository';

import { TourRepository } from '../tours';
import isAdditionScore from './helpers/is-addition-score';
import { IPairStatisticRawData } from './interfaces/raw-data.interfaces';
import { getAvailableDatesQuery, getPairStatisticQuery } from './sql';

@Injectable()
class StatisticService {
  constructor(
    private tourRepository: TourRepository,
    private gameSetRepository: GameSetRepository
  ) {}

  public async getPairStatistic(
    dto: GetPairStatisticQuery
  ): Promise<IPairStatistic[]> {
    const query = getPairStatisticQuery(dto);
    const rawData =
      await this.tourRepository.executeQuery<IPairStatisticRawData>(query);

    return rawData.map((item) => {
      return {
        user1: {
          id: Number(item.user1Id),
          shortName: `${item.user1LastName} ${item.user1FirstName.substring(
            0,
            1
          )}.`,
          score: Number(item.user1Score),
        },
        user2: {
          id: Number(item.user2Id),
          shortName: `${item.user2LastName} ${item.user2FirstName.substring(
            0,
            1
          )}.`,
          score: Number(item.user2Score),
        },
        gamesCount: Number(item.gamesCount),
        additionsCount: Number(item.additionsCount),
      };
    });
  }

  public async getCommonStatistic(): Promise<ICommonStatistic> {
    const allGameSets = await this.gameSetRepository.find();
    const inGameTime = await this.getInGameTime();

    const result: ICommonStatistic = {
      gamesCount: 0,
      additionsCount: 0,
      avgScoreDifference: 0,
      mostPopularScore: `0 | 0`,
      inGameTime,
    };
    const scoreCaptionCollection = new Map<TScoreCaption, number>();
    const scoreDifferenceCollection = new Set<number>();

    allGameSets.forEach((gameSet) => {
      result.gamesCount += 1;

      if (isAdditionScore(gameSet)) {
        result.additionsCount += 1;
      }

      const score = gameSet.scoreCaption;
      const foundScoreCaption = scoreCaptionCollection.get(score);

      scoreCaptionCollection.set(score, (foundScoreCaption ?? 0) + 1);
      scoreDifferenceCollection.add(
        Math.abs(gameSet.player1.score - gameSet.player2.score)
      );
    });

    return {
      ...result,
      mostPopularScore: maxInCollection(scoreCaptionCollection)?.[0] || '0 | 0',
      avgScoreDifference: avgOfSet(scoreDifferenceCollection),
    };
  }

  public getAvailableDates(): Promise<IAvailableDates[]> {
    return this.tourRepository.executeQuery(getAvailableDatesQuery());
  }

  private async getInGameTime(): Promise<string> {
    const raw = await this.gameSetRepository
      .createQueryBuilder('gameSet')
      .select(
        'SUM(TIMESTAMPDIFF(SECOND, gameSet.startDate, gameSet.endDate))',
        'seconds'
      )
      .where('gameSet.startDate is no null')
      .where('gameSet.endDate is not null')
      .getRawOne();

    const seconds = Number(raw.seconds) ?? 0;

    return humanizeDuration(seconds * 1000, { language: 'ru', delimiter: ',' });
  }
}

export default StatisticService;
