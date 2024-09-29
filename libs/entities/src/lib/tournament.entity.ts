import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tour } from './tour.entity';
import { User } from './user.entity';

@Entity()
export class Tournament extends BaseEntity implements ITournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', { nullable: true })
  date: Date;

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

  @ManyToMany(() => User, (user) => user.id, { eager: true, cascade: true })
  @JoinTable()
  registeredUsers: User[];

  isUnfinished: boolean;
  lastTourNumber: number;

  @AfterLoad()
  setVariables() {
    this.isUnfinished =
      this.status === ETournamentStatus.ACTIVE ||
      this.status === ETournamentStatus.PLAYOFF ||
      this.status === ETournamentStatus.REGISTRATION;

    const simpleTours = this.tours.filter((tour) => tour?.number);
    this.lastTourNumber = simpleTours[simpleTours.length - 1]?.number ?? 0;
  }
}
