import { Injectable } from '@nestjs/common';
import { CreateTourDto, FinishGameSetDto } from '@tennis-stats/dto';
import { Match, Tour } from '@tennis-stats/entities';
import { getRatingDelta, uniqueCombinations } from '@tennis-stats/helpers';
import { TMatchRatingDelta } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import { TourNotFoundException, UserNotFoundException } from '../../../../common/exceptions';
import { UsersRepository, UsersService } from '../../../users';
import { getAvailableScoresBySetsCount } from './helpers';
import MatchRepository from './match.repository';
import { GameSetService } from './modules/game-set';


@Injectable()
class MatchService {

  constructor(
    private dataSource: DataSource,
    private repository: MatchRepository,
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private gameSetService: GameSetService
  ) {
  }

  // async onApplicationBootstrap() {
  //     const x = await this.repository.find({
  //         relations: ['gameSets', 'tour']
  //     })
  //
  //     const usersRating = new Map<string, number>()
  //     usersRating.set('Дрик', 100)
  //     usersRating.set('Семенчуков', 100)
  //     usersRating.set('Коновалов', 100)
  //
  //     const res1: {
  //         date: string
  //         data: Map<string, number>
  //     }[] = []
  //
  //     x.forEach((match) => {
  //         // @ts-ignore
  //         const x = match.getWinnerLooser()
  //         if (!x) {
  //             return
  //         }
  //
  //         const { winner, looser } = x
  //
  //         if (winner.lastName === 'Дрик') {
  //             winner.rating = usersRating.get('Дрик') ?? 0
  //         }
  //         if (winner.lastName === 'Семенчуков') {
  //             winner.rating = usersRating.get('Семенчуков') ?? 0
  //         }
  //         if (winner.lastName === 'Коновалов') {
  //             winner.rating = usersRating.get('Коновалов') ?? 0
  //         }
  //
  //         if (looser.lastName === 'Дрик') {
  //             looser.rating = usersRating.get('Дрик') ?? 0
  //         }
  //         if (looser.lastName === 'Семенчуков') {
  //             looser.rating = usersRating.get('Семенчуков') ?? 0
  //         }
  //         if (looser.lastName === 'Коновалов') {
  //             looser.rating = usersRating.get('Коновалов') ?? 0
  //         }
  //
  //         const delta = getRatingDelta(winner.rating, looser.rating, match.totalScore)
  //
  //         usersRating.set(winner.lastName, winner.rating + delta)
  //         usersRating.set(looser.lastName, looser.rating - delta)
  //
  //         const found = res1.find((item) => item.date === format(match.tour.date, 'dd-MM-yyyy'))
  //
  //         if (!found) {
  //             res1.push({
  //                 date: format(match.tour.date, 'dd-MM-yyyy'),
  //                 data: new Map<string, number>([
  //                     [winner.lastName, winner.rating + delta],
  //                     [looser.lastName, looser.rating - delta],
  //                 ])
  //             })
  //         } else {
  //             found.data.set(winner.lastName, winner.rating + delta)
  //             found.data.set(looser.lastName, looser.rating - delta)
  //         }
  //     })
  //
  //     console.log(res1)
  //     console.log(usersRating)
  // }

  public async getMatchesForTour(dto: CreateTourDto): Promise<Match[]> {
    const allCombinationsIds = uniqueCombinations(dto.usersIds);

    const promises = allCombinationsIds.map(async (usersIds) => {
      const user1Entity = await this.usersRepository.findOneBy({ id: usersIds[0] });
      const user2Entity = await this.usersRepository.findOneBy({ id: usersIds[1] });

      if (!user1Entity || !user2Entity) {
        throw new UserNotFoundException();
      }

      const gameSets = await this.gameSetService.createEntities(usersIds, dto.setsCount);

      const match = new Match();
      match.user1 = user1Entity;
      match.user2 = user2Entity;
      match.gameSets = gameSets;

      return match;
    });

    return Promise.all(promises);
  }

  public async finishGameSet(matchId: number, gameSetId: number, dto: FinishGameSetDto) {
    await this.dataSource.transaction(async (manager) => {
      const gameSet = await this.gameSetService.finishGameSet(gameSetId, dto, manager);

      if (gameSet.isLastInMatch) {
        const match = await manager.findOne(Match, {
          relations: ['tour'],
          where: {
            id: matchId
          }
        });

        const tour = await manager.findOneBy(Tour, { id: match?.tour.id });

        await this.usersService.updateRating(tour, match, manager);
      }
    });
  }

  public async calculateRatingDelta(matchId: number): Promise<TMatchRatingDelta> {
    const match = await this.repository.findOneById(matchId);
    const tour = await this.dataSource.manager.findOneBy(Tour, { id: match.tour.id });

    if (!tour) {
      throw new TourNotFoundException();
    }

    const availableScores = getAvailableScoresBySetsCount(tour.setsCount);
    const result: TMatchRatingDelta = {};
    const { user1, user2 } = match;

    availableScores.forEach((score) => {
      const minScore = Math.min(...score);
      const maxScore = Math.max(...score);

      const deltaIfUser1Win = getRatingDelta(user1.rating, user2.rating, tour, {
        user1: maxScore,
        user2: minScore
      });

      const deltaIfUser2Win = getRatingDelta(user2.rating, user1.rating, tour, {
        user1: minScore,
        user2: maxScore
      });

      result[`${maxScore}-${minScore}`] = [
        { userName: user1.shortFullName, delta: `+${deltaIfUser1Win}` },
        { userName: user2.shortFullName, delta: `-${deltaIfUser1Win}` }
      ];

      result[`${minScore}-${maxScore}`] = [
        { userName: user1.shortFullName, delta: `-${deltaIfUser2Win}` },
        { userName: user2.shortFullName, delta: `+${deltaIfUser2Win}` }
      ];
    });

    return result;
  }

}


export default MatchService;
