import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, Player } from '@tennis-stats/entities';
import { allSynchronously, createArray } from '@tennis-stats/helpers';
import { EntityManager } from 'typeorm';
import {
  MatchNotFinishedException,
  UserNotFoundException,
} from '../../../common/exceptions';
import { IPair } from '../../pairs-generator';
import { UsersService } from '../../users';
import GameSetRepository from '../repositories/game-set.repository';

@Injectable()
class GameSetService {
  constructor(
    private repository: GameSetRepository,
    private usersService: UsersService
  ) {}

  public async createGameSet(number: number, pair?: IPair): Promise<GameSet> {
    if (!pair) {
      return this.repository.createEntity(number);
    }

    const player1 = await this.usersService.createPlayer(pair.user1.id);
    const player2 = await this.usersService.createPlayer(pair.user2.id);

    if (!player1 || !player2) {
      throw new UserNotFoundException();
    }

    return this.repository.createEntity(number, player1, player2);
  }

  public async createGameSets(setsCount: number, pair?: IPair): Promise<GameSet[]> {
    return allSynchronously(
      createArray(setsCount).map((i) => async () => {
        return await this.createGameSet(i + 1, pair);
      })
    );
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
}

export default GameSetService;
