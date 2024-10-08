import { IUser } from '@tennis-stats/types';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RatingHistory } from './rating-history.entity';
import { UserAuth } from './user-auth.entity';
import { Permission } from './permission.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, unique: true })
  nickname: string;

  @Column('int', { default: 100 })
  rating: number;

  @ManyToMany(() => Permission, { eager: true, cascade: true })
  @JoinTable()
  permissions: Permission[];

  @OneToOne(() => UserAuth, { cascade: true })
  @JoinColumn()
  auth?: UserAuth;

  @OneToMany(() => RatingHistory, (ratingHistory) => ratingHistory.user, {
    cascade: true,
  })
  ratingHistory?: RatingHistory[];
}
