import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, Player } from '@tennis-stats/entities';
import { createArray } from '@tennis-stats/helpers';
import { EntityManager } from 'typeorm';
import {
  MatchNotFinishedException,
  UnableReplaceUsersInMatch,
  UserNotFoundException,
} from '../../../common/exceptions';
import { IPair } from '../../../common/types';
import { UsersService } from '../../users';
import GameSetRepository from '../repositories/game-set.repository';

@Injectable()
class GameSetService {
  constructor(
    private repository: GameSetRepository,
    private usersService: UsersService
  ) {}

  public createGameSet(number: number, pair?: IPair): GameSet {
    if (!pair) {
      return this.repository.createEntity(number);
    }

    const player1 = this.usersService.createPlayer(pair.user1);
    const player2 = this.usersService.createPlayer(pair.user2);

    if (!player1 || !player2) {
      throw new UserNotFoundException();
    }

    return this.repository.createEntity(number, player1, player2);
  }

  public createGameSets(setsCount: number, pair?: IPair): GameSet[] {
    return createArray(setsCount).map((i) => {
      return this.createGameSet(i + 1, pair);
    });
  }

  public async finishGameSet(
    gameSet: GameSet,
    dto: GameSetScoreDto,
    manager: EntityManager
  ): Promise<GameSet> {
    await manager.update(GameSet, gameSet.id, { isFinished: true });

    await manager.update(
      Player,
      { id: gameSet.player1.id },
      {
        score: dto.player1Score,
        isWinner: dto.player1Score > dto.player2Score,
      }
    );

    await manager.update(
      Player,
      { id: gameSet.player2.id },
      {
        score: dto.player2Score,
        isWinner: dto.player2Score > dto.player1Score,
      }
    );

    return gameSet;
  }

  public async editGameSet(
    match: Match,
    gameSet: GameSet,
    dto: GameSetScoreDto
  ): Promise<GameSet> {
    if (!match.isFinished) {
      throw new MatchNotFinishedException();
    }

    gameSet.player1.score = dto.player1Score;
    gameSet.player2.score = dto.player2Score;

    if (gameSet.isFinished) {
      gameSet.player1.isWinner = dto.player1Score > dto.player2Score;
      gameSet.player2.isWinner = dto.player2Score > dto.player1Score;
    }

    await gameSet.save();

    return gameSet;
  }

  public replaceUser(
    gameSet: GameSet,
    currentUserId: number,
    newPlayer: Player
  ): GameSet {
    const playerKey = gameSet.getPlayerKeyByUserId(currentUserId);

    if (!playerKey) {
      throw new UnableReplaceUsersInMatch();
    }

    return GameSet.create({
      ...gameSet,
      [playerKey]: newPlayer,
    });
  }
}

export default GameSetService;
