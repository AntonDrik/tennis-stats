import { User } from './user.entity';
import { IRatingHistory } from '@tennis-stats/types';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RatingHistory extends BaseEntity implements IRatingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column('datetime', { nullable: true })
  date: Date;

  @Column('int', { nullable: false })
  rating: number;
}
