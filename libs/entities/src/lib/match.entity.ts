import { IMatch, IMatchScore } from '@tennis-stats/types';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameSet } from './game-set.entity';
import { Tour } from './tour.entity';
import { User } from './user.entity';

@Entity()
export class Match extends BaseEntity implements IMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  tour: Tour;

  @ManyToOne(() => User, { eager: true })
  user1: User;

  @ManyToOne(() => User, { eager: true })
  user2: User;

  @Column('int')
  number: number;

  @OneToMany(() => GameSet, (gameSet) => gameSet.match, {
    eager: true,
    cascade: true,
  })
  gameSets: GameSet[];

  totalScore: IMatchScore = {
    user1: 0,
    user2: 0,
  };

  isFinished: boolean;

  @AfterLoad()
  loadVariables() {
    const gameSets = this.gameSets ?? [];
    gameSets.forEach((item) => {
      if (item.player1?.isWinner) {
        this.totalScore.user1 += 1;
      }

      if (item.player2?.isWinner) {
        this.totalScore.user2 += 1;
      }
    });

    this.isFinished = gameSets.every((gameSet) => gameSet.isFinished);
  }

  public getWinnerLooser() {
    const isWinnerUser1 = this.totalScore.user1 > this.totalScore.user2;

    if (this.totalScore.user1 === this.totalScore.user2) {
      return null;
    }

    return {
      winner: isWinnerUser1 ? this.user1 : this.user2,
      looser: isWinnerUser1 ? this.user2 : this.user1,
    };
  }

  public isWinner(user: User): boolean {
    const winnerLooser = this.getWinnerLooser();

    if (!winnerLooser) {
      return false;
    }

    return winnerLooser.winner.id === user.id;
  }
}
