import { Injectable } from '@nestjs/common';
import { GameSet, Player } from '@tennis-stats/entities';
import { DataSource } from 'typeorm';
import { GameSetNotFoundException } from '../../../common/exceptions';
import BaseRepository from '../../../common/utils/base.repository';

@Injectable()
class GameSetRepository extends BaseRepository<GameSet> {
  constructor(dataSource: DataSource) {
    super(GameSet, dataSource);
  }

  public async findById(id: number): Promise<GameSet> {
    const gameSet = await this.findOneBy({ id });

    if (!gameSet) {
      throw new GameSetNotFoundException();
    }

    return gameSet;
  }

  // public findManyByUserId(userId: number) {
  //   return this.findBy([
  //     {
  //       player1: {
  //         user: { id: userId },
  //       },
  //       ...(options?.onlyFinished ? { status: EGameSetStatus.FINISHED } : {}),
  //       ...(options?.date
  //         ? {
  //             match: {
  //               // tour: { date: options.date },
  //             },
  //           }
  //         : {}),
  //     },
  //     {
  //       player2: {
  //         user: { id: userId },
  //       },
  //       ...(options?.onlyFinished ? { status: EGameSetStatus.FINISHED } : {}),
  //       ...(options?.date
  //         ? {
  //             match: {
  //               // tour: { date: options.date },
  //             },
  //           }
  //         : {}),
  //     },
  //   ]);
  // }

  public getAllUnfinished(tourId: number): Promise<GameSet[]> {
    return this.findBy({
      isFinished: false,
      match: {
        tour: { id: tourId },
      },
    });
  }

  public createEntity(
    number: number,
    player1?: Player,
    player2?: Player
  ): GameSet {
    const gameSet = new GameSet();

    if (player1) {
      gameSet.player1 = player1;
    }

    if (player2) {
      gameSet.player2 = player2;
    }

    gameSet.number = number;

    return gameSet;
  }
}

export default GameSetRepository;
