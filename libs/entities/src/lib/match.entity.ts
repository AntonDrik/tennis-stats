import { MatchHelpers } from '@tennis-stats/helpers';
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
import { RatingHistory } from './rating-history.entity';
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

  @Column('datetime', { nullable: true })
  endDate: Date;

  @Column('int')
  number: number;

  @Column('boolean', { default: false })
  isPlayoff: boolean;

  @OneToMany(() => GameSet, (gameSet) => gameSet.match, {
    eager: true,
    cascade: true,
  })
  gameSets: GameSet[];

  @OneToMany(() => RatingHistory, (ratingHistory) => ratingHistory.match)
  ratingHistory: RatingHistory[];

  totalScore: IMatchScore = {
    user1: 0,
    user2: 0,
  };

  isFinished: boolean;

  // Флаг указывающий на то, что матч не должен быть засчитан. (Игра с Халявой)
  isFictive: boolean;

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

    this.isFictive = this.user1?.nickname === 'Халява' || this.user2?.nickname === 'Халява';
  }

  get helpers() {
    return new MatchHelpers<Match>(this);
  }
}
