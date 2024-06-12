import { IPlayer, TScore } from '@tennis-stats/types';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerStat } from './player-stats.entity';

import { User } from './user.entity';


@Entity()
export class Player extends BaseEntity implements IPlayer {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column('int')
  score: TScore;

  @Column('boolean', { default: false })
  isWinner: boolean;

}
