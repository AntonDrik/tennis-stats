import { Injectable } from '@nestjs/common';
import { CreateTourDto, SwapUserDto } from '@tennis-stats/dto';
import { Match, Tour, User } from '@tennis-stats/entities';
import {
  allSynchronously,
  createArray,
  getRatingDelta,
  getRoundInfo,
} from '@tennis-stats/helpers';
import { TMatchRatingDelta, TPlayOffStage } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import { TournamentNotFoundException } from '../../../common/exceptions';
import { UsersRepository, UsersService } from '../../users';
import getAllScoresForMatch from '../helpers/get-all-scores-for-match.helper';
import MatchRepository from '../repositories/match.repository';
import GameSetService from './game-set.service';
import PairsGeneratorService from './pairs-generator.service';

@Injectable()
class MatchService {
  constructor(
    private dataSource: DataSource,
    private repository: MatchRepository,
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private gameSetService: GameSetService,
    private pairsGeneratorService: PairsGeneratorService
  ) {}

  public async createMatches(
    users: User[],
    tourDto: CreateTourDto
  ): Promise<Match[]> {
    const pairs = this.pairsGeneratorService.generatePairs(
      users,
      tourDto.pairsGenerator
    );

    return allSynchronously(
      pairs.map((pair, index) => async () => {
        const gameSets = await this.gameSetService.createGameSets(
          tourDto.setsCount,
          pair
        );

        const match = new Match();
        match.user1 = pair.user1;
        match.user2 = pair.user2;
        match.number = index + 1;
        match.gameSets = gameSets;

        return match;
      })
    );
  }

  public async createMatchesForPlayoffRound(
    round: TPlayOffStage,
    setsCount: number
  ) {
    const roundInfo = getRoundInfo(round);

    return allSynchronously(
      createArray(roundInfo.matchesCount).map((index) => async () => {
        const gameSets = await this.gameSetService.createGameSets(setsCount);

        const match = new Match();
        match.number = index + 1;
        match.gameSets = gameSets;

        return match;
      })
    );
  }

  public async deleteMatch(match: Match) {
    await match.remove();
  }

  public async swapUser(match: Match, dto: SwapUserDto) {
    const newUser = await this.usersRepository.findById(dto.newUserId);

    if (match.user1.id === dto.currentUserId) {
      match.user1 = newUser;
    }

    if (match.user2.id === dto.currentUserId) {
      match.user2 = newUser;
    }

    await match.save();

    return match;
  }

  public async calculateRatingDelta(match: Match): Promise<TMatchRatingDelta> {
    const tour = await this.dataSource.manager.findOneBy(Tour, {
      id: match.tour.id,
    });

    if (!tour) {
      throw new TournamentNotFoundException();
    }

    const availableScores = getAllScoresForMatch(tour.setsCount);
    const result: TMatchRatingDelta = {};
    const { user1, user2 } = match;

    availableScores.forEach((score) => {
      const minScore = Math.min(...score);
      const maxScore = Math.max(...score);

      const deltaIfUser1Win = getRatingDelta(user1.rating, user2.rating, tour, {
        user1: maxScore,
        user2: minScore,
      });

      const deltaIfUser2Win = getRatingDelta(user2.rating, user1.rating, tour, {
        user1: minScore,
        user2: maxScore,
      });

      result[`${maxScore}-${minScore}`] = [
        { userName: user1.nickname, delta: `+${deltaIfUser1Win}` },
        { userName: user2.nickname, delta: `-${deltaIfUser1Win}` },
      ];

      result[`${minScore}-${maxScore}`] = [
        { userName: user1.nickname, delta: `-${deltaIfUser2Win}` },
        { userName: user2.nickname, delta: `+${deltaIfUser2Win}` },
      ];
    });

    return result;
  }
}

export default MatchService;
