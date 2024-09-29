import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, Player } from '@tennis-stats/entities';
import { allSynchronously, createArray } from '@tennis-stats/helpers';
import { DataSource, EntityManager } from 'typeorm';
import {
  GameSetFinishedException,
  GameSetNotFoundException,
  UserNotFoundException,
} from '../../../common/exceptions';
import { UsersService } from '../../users';
import GameSetRepository from '../repositories/game-set.repository';
import { IPair } from '../interfaces/pair.interface';

@Injectable()
class GameSetService {
  constructor(
    private dataSource: DataSource,
    private repository: GameSetRepository,
    private usersService: UsersService
  ) {}

  public async createGameSet(number: number, pair?: IPair) {
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

  public async createGameSets(
    setsCount: number,
    pair?: IPair
  ): Promise<GameSet[]> {
    return allSynchronously(
      createArray(setsCount).map((i) => async () => {
        return await this.createGameSet(i + 1, pair);
      })
    );
  }

  public async finishGameSet(
    match: Match,
    gameSet: GameSet,
    dto: GameSetScoreDto,
    transactionManager?: EntityManager
  ): Promise<GameSet> {
    if (gameSet.isFinished) {
      throw new GameSetFinishedException();
    }

    await this.repository.withTransaction(async (manager) => {
      await manager.update(
        GameSet,
        { id: gameSet.id },
        {
          isFinished: true,
          endDate: new Date(),
        }
      );

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

      const updatedMatch = await manager.findOneBy(Match, { id: match.id });

      if (!updatedMatch?.getWinnerLooser() && updatedMatch?.isFinished) {
        await this.addGameSetToMatch(updatedMatch, manager);
      }
    }, transactionManager);

    return gameSet;
  }

  public async editScore(
    gameSet: GameSet,
    dto: GameSetScoreDto
  ): Promise<GameSet> {
    if (!gameSet) {
      throw new GameSetNotFoundException();
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

  private async addGameSetToMatch(match: Match, manager: EntityManager) {
    const pair: IPair = {
      user1: match.user1,
      user2: match.user2,
    };

    const gameSet = await this.createGameSet(match.gameSets.length + 1, pair);
    match.gameSets.push(gameSet);

    await manager.save(Match, match);
  }
}

export default GameSetService;
