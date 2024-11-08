import { Match } from './match.entity';
import { User } from './user.entity';
import { IRatingHistory } from '@tennis-stats/types';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RatingHistory extends BaseEntity implements IRatingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column('datetime', { nullable: true })
  date: Date;

  @Column('double', { nullable: false })
  rating: number;

  @Column('varchar', { nullable: true })
  visual: string;

  @ManyToOne(() => Match, { cascade: true })
  match: Match;
}
