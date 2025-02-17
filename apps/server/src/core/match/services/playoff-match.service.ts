import { Injectable } from '@nestjs/common';
import { GameSet, Match, User } from '@tennis-stats/entities';
import { createArray, getPlayoffStageInfo } from '@tennis-stats/helpers';
import { TPlayOffStage } from '@tennis-stats/types';
import { EntityManager, Equal } from 'typeorm';
import { UsersService } from '../../users';
import GameSetService from './game-set.service';

@Injectable()
class PlayoffMatchService {
  constructor(private gameSetService: GameSetService, private usersService: UsersService) {}

  public createEmptyPlayoffMatch(stage: TPlayOffStage, setsCount: number): Match[] {
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

  public async setWinnerToNextPlayoffMatch(match: Match, winner: User, manager: EntityManager) {
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

export default PlayoffMatchService;
