import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, User } from '@tennis-stats/entities';
import {
  allSynchronously,
  createArray,
  getPlayoffStageInfo,
} from '@tennis-stats/helpers';
import { EPermission, TPlayOffStage } from '@tennis-stats/types';
import { DataSource, EntityManager } from 'typeorm';
import { GameSetFinishedException } from '../../../common/exceptions';
import { matchPermissions } from '../../../common/utils';
import { UsersService } from '../../users';
import getNextPlayoffStageMatchId from '../helpers/get-next-playoff-stage-match-id.helper';
import { IPair } from '../interfaces/pair.interface';
import GameSetService from './game-set.service';

@Injectable()
class MatchService {
  constructor(
    private dataSource: DataSource,
    private gameSetService: GameSetService,
    private usersService: UsersService
  ) {}

  public isUserCanCrudMatch(user: User, match: Match) {
    if (matchPermissions([EPermission.TOURNAMENT_CRUD], user)) {
      return true;
    }

    return match.user1?.id === user.id || match.user2?.id === user.id;
  }

  public async createMatches(pairs: IPair[], setsCount: number, isPlayoff = false) {
    return allSynchronously(
      pairs.map((pair, index) => async () => {
        const gameSets = await this.gameSetService.createGameSets(setsCount, pair);

        const match = new Match();
        match.user1 = pair.user1;
        match.user2 = pair.user2;
        match.number = index + 1;
        match.isPlayoff = isPlayoff;
        match.gameSets = gameSets;

        return match;
      })
    );
  }

  public async createMatchesForPlayoffStage(stage: TPlayOffStage, setsCount: number) {
    const stageInfo = getPlayoffStageInfo(stage);

    return allSynchronously(
      createArray(stageInfo.matchesCount).map((index) => async () => {
        const gameSets = await this.gameSetService.createGameSets(setsCount);

        const match = new Match();
        match.number = index + 1;
        match.isPlayoff = true;
        match.gameSets = gameSets;

        return match;
      })
    );
  }

  public async finishGameSet(match: Match, gameSet: GameSet, dto: GameSetScoreDto) {
    if (gameSet.isFinished) {
      throw new GameSetFinishedException();
    }

    await this.dataSource.transaction(async (manager) => {
      await this.gameSetService.finishGameSet(gameSet, dto, manager);

      const updatedMatch = await manager.findOne(Match, {
        where: { id: match.id },
        order: { id: 'ASC' },
        relations: ['tour'],
      });

      if (!updatedMatch?.isFinished) {
        return;
      }

      await this.handleFinishedMatch(updatedMatch, manager);
    });
  }

  private async handleFinishedMatch(match: Match, manager: EntityManager) {
    const winnerLooser = match.getWinnerLooser();

    if (!winnerLooser) {
      await this.addGameSetToMatch(match, manager);

      return;
    }

    if (match.tour.playOffStage) {
      await this.setWinnerToNextPlayoffStage(match, winnerLooser.winner, manager);
    }

    await manager.update(Match, { id: match.id }, { endDate: new Date() });
  }

  private async addGameSetToMatch(match: Match, manager: EntityManager) {
    const gameSet = await this.gameSetService.createGameSet(match.nextGameSetNumber, {
      user1: match.user1,
      user2: match.user2,
    });

    match.gameSets.push(gameSet);

    await manager.save(Match, match);
  }

  private async setWinnerToNextPlayoffStage(
    match: Match,
    winner: User,
    manager: EntityManager
  ) {
    const nextMatchId = getNextPlayoffStageMatchId(match);
    const userNumber = match.number % 2 === 0 ? 2 : 1;

    const nextMatch = await manager.findOne(Match, {
      where: { id: nextMatchId },
      relations: ['gameSets'],
    });

    if (!nextMatch) {
      return;
    }

    const player = await this.usersService.createPlayer(winner.id);

    const newGameSets = nextMatch.gameSets.map((gameSet) => {
      return GameSet.create({
        ...gameSet,
        [`player${userNumber}`]: player,
      });
    });

    nextMatch[`user${userNumber}`] = winner;
    nextMatch.gameSets = newGameSets;

    await manager.save(nextMatch);
  }
}

export default MatchService;
