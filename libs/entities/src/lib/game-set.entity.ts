import { IGameSet, TScoreCaption } from '@tennis-stats/types';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.entity';

import { Player } from './player.entity';

@Entity()
export class GameSet extends BaseEntity implements IGameSet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  match: Match;

  @Column('int', { nullable: false })
  number: number;

  @OneToOne(() => Player, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  player1: Player;

  @OneToOne(() => Player, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  player2: Player;

  @Column('datetime', { nullable: true })
  startDate: Date;

  @Column('datetime', { nullable: true })
  endDate: Date;

  @Column('boolean', { nullable: false, default: false })
  isFinished: boolean;

  scoreCaption: TScoreCaption;

  @AfterLoad()
  loadVariables() {
    this.scoreCaption = `${this.player1?.score} | ${this.player2?.score}`;
  }
}
