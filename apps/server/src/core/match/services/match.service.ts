import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, User } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { DataSource, EntityManager } from 'typeorm';
import { GameSetFinishedException, UnableReplaceUsersInMatch } from '../../../common/exceptions';
import { IPair } from '../../../common/types';
import { matchPermissions } from '../../../common/utils';
import { UsersService } from '../../users';
import GameSetService from './game-set.service';
import PlayoffMatchService from './playoff-match.service';

@Injectable()
class MatchService {
  constructor(
    private dataSource: DataSource,
    private usersService: UsersService,
    private gameSetService: GameSetService,
    private playoffMatchService: PlayoffMatchService
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

      if (!updatedMatch) {
        return;
      }

      if (!updatedMatch?.isFinished && updatedMatch?.helpers.isScoreEqual()) {
        await this.addGameSetToMatch(updatedMatch, manager);

        return;
      }

      await this.handleFinishedMatch(updatedMatch, manager);
    });
  }

  public replaceUser(match: Match, currentUser: User, newUser: User): Match {
    const userKey = match.helpers.getUserKeyByUserId(currentUser.id);

    if (!userKey) {
      throw new UnableReplaceUsersInMatch('userKey не найден');
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
      return;
    }

    if (match.tour.playOffStage) {
      await this.playoffMatchService.setWinnerToNextPlayoffMatch(
        match,
        winnerLooser.winner,
        manager
      );
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
}

export default MatchService;
