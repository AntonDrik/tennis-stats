import { ITournamentLeaderboard } from '@tennis-stats/types';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tournament } from './tournament.entity';

import { User } from './user.entity';

@Entity()
export class TournamentLeaderboard extends BaseEntity implements ITournamentLeaderboard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  tournament: Tournament;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column('int', { nullable: false })
  place: number;
}
