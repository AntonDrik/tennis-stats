import { Injectable } from '@nestjs/common';
import { GameSet } from '@tennis-stats/entities';
import { IProfile } from '@tennis-stats/types';
import { startOfDay } from 'date-fns';
import { LessThan } from 'typeorm';
import GameSetRepository from '../../../match/repositories/game-set.repository';
import UsersRepository from '../../users.repository';
import { getWinPercent } from './helpers';

@Injectable()
class ProfileService {
  constructor(
    private usersRepository: UsersRepository,
    private gameSetRepository: GameSetRepository
  ) {}

  public async getInfo(userId: number) {
    // const user = await this.usersRepository.findById(userId);
    //
    // const allGameSets = await this.gameSetRepository.findManyByUserId(userId, {
    //   onlyFinished: true,
    // });
    //
    // const winPercent = await this.getWinPercent(userId, allGameSets);
    //
    // return {
    //   user,
    //   winPercent,
    //   gamesCount: allGameSets.length,
    // };
  }

  private async getWinPercent(userId: number, allGameSets: GameSet[]) {
    // const prevGameSets = await this.gameSetRepository.findManyByUserId(userId, {
    //   onlyFinished: true,
    //   date: LessThan(startOfDay(new Date())),
    // });
    //
    // const currWinPercent = getWinPercent(userId, allGameSets);
    // const prevWinPercent = getWinPercent(userId, prevGameSets);
    // const todayWinPercentDiff = Number(
    //   (currWinPercent - prevWinPercent).toFixed(2)
    // );
    //
    // return {
    //   prev: prevWinPercent,
    //   todayDiff: todayWinPercentDiff,
    // };
  }
}

export default ProfileService;
