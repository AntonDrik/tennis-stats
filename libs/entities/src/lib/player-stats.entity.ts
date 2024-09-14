import { IPlayerStat } from '@tennis-stats/types';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { StatsDictionary } from './stats-dictionary.entity';
import { User } from './user.entity';


@Entity()
export class PlayerStat extends BaseEntity implements IPlayerStat {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Match)
  match: Match;

  @ManyToOne(() => StatsDictionary, { eager: true })
  stat: StatsDictionary;

  @Column('int')
  count: number;

}
