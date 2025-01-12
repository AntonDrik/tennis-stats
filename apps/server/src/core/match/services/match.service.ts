import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, User } from '@tennis-stats/entities';
import { createArray, getPlayoffStageInfo } from '@tennis-stats/helpers';
import { EPermission, TPlayOffStage } from '@tennis-stats/types';
import { DataSource, EntityManager, Equal } from 'typeorm';
import { GameSetFinishedException, UnableReplaceUsersInMatch } from '../../../common/exceptions';
import { IPair } from '../../../common/types';
import { matchPermissions } from '../../../common/utils';
import { UsersService } from '../../users';
import GameSetService from './game-set.service';

@Injectable()
class MatchService {
  constructor(
    private dataSource: DataSource,
    private gameSetService: GameSetService,
    private usersService: UsersService
  ) {}

  public isUserCanCrudMatch(user: User, match: Match): boolean {
    if (matchPermissions([EPermission.TOURNAMENT_CRUD], user)) {
      return true;
    }

    return match.user1?.id === user.id || match.user2?.id === user.id;
  }

  public createMatch(pair: IPair, setsCount: number, index: number, isPlayoff = false): Match {
    const gameSets = this.gameSetService.createGameSets(setsCount, pair);

    const match = new Match();
    match.user1 = pair.user1;
    match.user2 = pair.user2;
    match.number = index;
    match.isPlayoff = isPlayoff;
    match.gameSets = gameSets;

    return match;
  }

  public createMatches(pairs: IPair[], setsCount: number, isPlayoff = false): Match[] {
    return pairs.map((pair, index) => {
      return this.createMatch(pair, setsCount, index + 1, isPlayoff);
    });
  }

  public createEmptyPlayoffStage(stage: TPlayOffStage, setsCount: number): Match[] {
    const stageInfo = getPlayoffStageInfo(stage);

    return createArray(stageInfo.matchesCount).map((index) => {
      const gameSets = this.gameSetService.createGameSets(setsCount);

      const match = new Match();
      match.number = index + 1;
      match.isPlayoff = true;
      match.gameSets = gameSets;

      return match;
    });
  }

  public async finishGameSet(match: Match, gameSet: GameSet, dto: GameSetScoreDto): Promise<void> {
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

  public replaceUser(match: Match, currentUser: User, newUser: User): Match {
    const userKey = match.helpers.getUserKeyByUserId(currentUser.id);

    if (!userKey) {
      throw new UnableReplaceUsersInMatch();
    }

    const newPlayer = this.usersService.createPlayer(newUser);

    const updatedGameSets = match.gameSets.map((gameSet) => {
      return this.gameSetService.replaceUser(gameSet, currentUser.id, newPlayer);
    });

    match.gameSets = updatedGameSets;
    match[userKey] = newUser;

    return match;
  }

  private async handleFinishedMatch(match: Match, manager: EntityManager): Promise<void> {
    const winnerLooser = match.helpers.getWinnerLooser();

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
    const nextGameSetNumber = match.helpers.getNextGameSetNumber();

    const gameSet = this.gameSetService.createGameSet(nextGameSetNumber, {
      user1: match.user1,
      user2: match.user2,
    });

    match.gameSets.push(gameSet);

    await manager.save(Match, match);
  }

  private async setWinnerToNextPlayoffStage(match: Match, winner: User, manager: EntityManager) {
    const nextMatchId = match.helpers.getNextPlayoffStageMatchId();
    const userNumber = match.number % 2 === 0 ? 2 : 1;

    const nextMatch = await manager.findOne(Match, {
      where: { id: Equal(nextMatchId) },
      relations: ['gameSets'],
    });

    if (!nextMatch) {
      return;
    }

    const player = this.usersService.createPlayer(winner);

    const updatedGameSets = nextMatch.gameSets.map((gameSet) => {
      return GameSet.create({
        ...gameSet,
        [`player${userNumber}`]: player,
      });
    });

    nextMatch[`user${userNumber}`] = winner;
    nextMatch.gameSets = updatedGameSets;

    await manager.save(Match, nextMatch);
  }
}

export default MatchService;
