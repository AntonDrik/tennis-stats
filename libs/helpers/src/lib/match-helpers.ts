import { IMatch, IUser } from '@tennis-stats/types';
import { getPlayoffStageInfo } from '../index';

export interface IWinnerLooser<T extends IMatch> {
  winner: T['user1'];
  looser: T['user1'];
}

class MatchHelpers<T extends IMatch> {
  private gameSets: T['gameSets'] = [];

  constructor(private match: T) {}

  public getWinnerLooser(): IWinnerLooser<T> | null {
    const totalScore = this.match.totalScore;

    const isWinnerUser1 = totalScore.user1 > totalScore.user2;

    if (totalScore.user1 === totalScore.user2) {
      return null;
    }

    return {
      winner: isWinnerUser1 ? this.match.user1 : this.match.user2,
      looser: isWinnerUser1 ? this.match.user2 : this.match.user1,
    };
  }

  public isWinner(user: IUser): boolean {
    const winnerLooser = this.getWinnerLooser();

    if (!winnerLooser) {
      return false;
    }

    return winnerLooser.winner.id === user.id;
  }

  public getUserKeyByUserId(userId: number): 'user1' | 'user2' | null {
    if (this.match.user1?.id === userId) {
      return 'user1';
    }

    if (this.match.user2?.id === userId) {
      return 'user2';
    }

    return null;
  }

  public getNextGameSetNumber(): number {
    return (this.gameSets?.length ?? 0) + 1;
  }

  public getNextPlayoffStageMatchId(): number {
    const currStage = this.match.tour?.playOffStage;

    const currStageMatchesCount = getPlayoffStageInfo(currStage).matchesCount;

    const multiplier = this.match.number / 2;
    const increaseValue = Math.ceil(currStageMatchesCount - this.match.number + multiplier);

    return this.match.id + increaseValue;
  }
}

export default MatchHelpers;
