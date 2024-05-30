import { Injectable } from '@nestjs/common';
import { FinishGameSetDto, GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Player, Tour } from '@tennis-stats/entities';
import { EGameSetStatus } from '@tennis-stats/types';
import { DataSource, EntityManager } from 'typeorm';
import {
  GameSetFinishedException, GameSetNotFoundException,
  UserNotFoundException
} from '../../../../../../common/exceptions';
import settle from '../../../../../../common/utils/settle';
import { UsersRepository } from '../../../../../users';
import GameSetRepository from './game-set.repository';


@Injectable()
class GameSetService {

  constructor(
    private dataSource: DataSource,
    private repository: GameSetRepository,
    private usersRepository: UsersRepository
  ) {
  }

  public createEntities(usersIds: number[], setsCount: number): Promise<GameSet[]> {
    const promises = Array.from({ length: setsCount }, async (_, i) => {

      const player1Entity = await this.usersRepository.getPlayerEntity(usersIds[0]);
      const player2Entity = await this.usersRepository.getPlayerEntity(usersIds[1]);

      if (!player1Entity || !player2Entity) {
        throw new UserNotFoundException();
      }

      const number = i + 1;
      const isLast = number === setsCount;

      return this.repository.createEntity(
        player1Entity,
        player2Entity,
        number,
        isLast
      );
    });

    return Promise.all(promises);
  }

  public async startGameSet(id: number): Promise<GameSet> {
    const gameSet = await this.repository.findById(id);

    if (gameSet.isFinished) {
      throw new GameSetFinishedException();
    }

    gameSet.status = EGameSetStatus.IN_PROCESS;
    gameSet.startDate = new Date();
    await gameSet.save();

    return gameSet;
  }

  public async finishGameSet(id: number, dto: FinishGameSetDto, transactionManager?: EntityManager): Promise<GameSet> {
    const gameSet = await this.repository.findById(id);

    if (gameSet.isFinished) {
      throw new GameSetFinishedException();
    }

    await this.repository.withTransaction(async (manager) => {
      await manager.update(GameSet, { id: gameSet.id }, {
        status: dto.status,
        endDate: new Date()
      });

      await manager.update(Player, { id: gameSet.player1.id }, {
        score: dto.player1Score,
        isWinner: dto.player1Score > dto.player2Score
      });

      await manager.update(Player, { id: gameSet.player2.id }, {
        score: dto.player2Score,
        isWinner: dto.player2Score > dto.player1Score
      });

      await manager.update(GameSet, { id: gameSet.id + 1 }, {
        status: EGameSetStatus.READY_TO_START
      });
    }, transactionManager);

    return gameSet;
  }

  public async cancelUnfinishedGameSets(tour: Tour, transactionManager?: EntityManager): Promise<void> {
    const unfinishedGameSetList = await this.repository.getAllUnfinished(tour.id);

    await this.repository.withTransaction(async (manager) => {
      const promise = unfinishedGameSetList.map((gameSet) => {
        return manager.update(GameSet, { id: gameSet.id }, {
          status: EGameSetStatus.CANCELED
        });
      });

      await settle(promise);
    }, transactionManager);
  }

  public async updateScore(id: number, dto: GameSetScoreDto): Promise<GameSet> {
    const gameSet = await this.repository.findById(id);

    if (!gameSet) {
      throw new GameSetNotFoundException();
    }

    if (gameSet.isFinished) {
      throw new GameSetFinishedException();
    }

    gameSet.player1.score = dto.player1Score;
    gameSet.player2.score = dto.player2Score;

    await gameSet.save();

    return gameSet;
  }

  public async editScore(id: number, dto: GameSetScoreDto): Promise<GameSet> {
    const gameSet = await this.repository.findById(id);

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

}

export default GameSetService;
