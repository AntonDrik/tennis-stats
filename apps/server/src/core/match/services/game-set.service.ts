import { Injectable } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, Player, User } from '@tennis-stats/entities';
import { allSynchronously, createArray } from '@tennis-stats/helpers';
import { TPlayOffRound } from '@tennis-stats/types';
import { DataSource, EntityManager } from 'typeorm';
import {
  GameSetFinishedException,
  MatchNotFinishedException,
  UserNotFoundException,
} from '../../../common/exceptions';
import { UsersService } from '../../users';
import getNextPlayoffMatchId from '../helpers/getNextPlayoffMatchId';
import { IPair } from '../interfaces/pair.interface';
import GameSetRepository from '../repositories/game-set.repository';

@Injectable()
class GameSetService {
  constructor(
    private dataSource: DataSource,
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
    match: Match,
    gameSet: GameSet,
    dto: GameSetScoreDto
  ): Promise<GameSet> {
    if (gameSet.isFinished) {
      throw new GameSetFinishedException();
    }

    await this.repository.withTransaction(async (manager) => {
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

      await this.handleMatchAfterFinish(match.id, manager);
    });

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

  private async handleMatchAfterFinish(matchId: number, manager: EntityManager) {
    const updatedMatch = await manager.findOne(Match, {
      where: { id: matchId },
      order: { id: 'ASC' },
      relations: ['tour'],
    });

    if (!updatedMatch?.isFinished) {
      return;
    }

    const winnerLooser = updatedMatch.getWinnerLooser();

    if (!winnerLooser) {
      await this.addGameSetToMatch(updatedMatch, manager);

      return;
    }

    if (updatedMatch.tour.playOffStage) {
      await this.setPlayoffMatchWinner(updatedMatch, winnerLooser.winner, manager);
    }
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

  private async setPlayoffMatchWinner(
    match: Match,
    winner: User,
    manager: EntityManager
  ) {
    const round = match.tour.playOffStage as TPlayOffRound;
    const nextMatchId = getNextPlayoffMatchId(match, round);
    const isUpdateUser1 = !Number.isInteger(match.number / 2);

    const nextMatch = await manager.findOne(Match, {
      where: { id: nextMatchId },
      relations: ['gameSets'],
    });

    if (!nextMatch) {
      return;
    }

    await manager.update(
      Match,
      { id: nextMatchId },
      {
        ...(isUpdateUser1 ? { user1: winner } : { user2: winner }),
      }
    );

    const player = await this.usersService.createPlayer(winner.id);

    nextMatch.gameSets = nextMatch.gameSets.map((gameSet) => {
      return GameSet.create({
        ...gameSet,
        ...(isUpdateUser1 ? { player1: player } : { player2: player }),
      });
    });

    await manager.save(nextMatch.gameSets);
  }
}

export default GameSetService;
