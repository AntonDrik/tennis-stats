import { ETournamentStatus, ETournamentType, ITournament } from '@tennis-stats/types';
import { TournamentHelpers } from '@tennis-stats/helpers';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tour } from './tour.entity';
import { TournamentLeaderboard } from './tournament-leaderboard.entity';
import { User } from './user.entity';

@Entity()
export class Tournament extends BaseEntity implements ITournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', { nullable: true })
  date: Date;

  @Column('varchar', { default: ETournamentType.SWISS_SYSTEM })
  type: ETournamentType;

  @Column('varchar', { default: ETournamentStatus.REGISTRATION })
  status: ETournamentStatus;

  @Column('int', { nullable: false })
  playersCount: number;

  @Column('boolean', { nullable: false, default: true })
  handleRating: boolean;

  @OneToMany(() => Tour, (tour) => tour.tournament, {
    eager: true,
    cascade: true,
  })
  tours: Tour[];

  @OneToMany(() => TournamentLeaderboard, (tour) => tour.tournament, {
    eager: true,
    cascade: true,
  })
  leaderboard: TournamentLeaderboard[];

  @ManyToMany(() => User, (user) => user.id, { eager: true, cascade: true })
  @JoinTable()
  registeredUsers: User[];

  get hasPlayoff(): boolean {
    return this.tours?.some((tour) => tour.playOffStage);
  }

  get helpers() {
    return new TournamentHelpers<Tournament>(this);
  }
}
