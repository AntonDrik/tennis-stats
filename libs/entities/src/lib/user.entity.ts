import { IUser } from '@tennis-stats/types';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { RatingHistory } from './rating-history.entity';
import { UserAuth } from './user-auth.entity';
import { Permission } from './permission.entity';


@Entity()
export class User extends BaseEntity implements IUser {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  firstName: string;

  @Column('varchar', { nullable: false })
  lastName: string;

  @Column('varchar', { default: '#E0E1E6' })
  color: string;

  @Column('int', { default: 100 })
  rating: number;

  @ManyToMany(() => Permission, { eager: true, cascade: true })
  @JoinTable()
  permissions: Permission[];

  @OneToOne(() => UserAuth, { cascade: true })
  @JoinColumn()
  auth?: UserAuth;

  @OneToMany(
    () => RatingHistory,
    ratingHistory => ratingHistory.user,
    { cascade: true }
  )
  ratingHistory?: RatingHistory[];

  /**
   * Computed
   */
  fullName: string;
  shortFullName: string;

  @AfterLoad()
  private loadVariables(): void {
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.shortFullName = `${this.lastName} ${this.firstName.substring(0, 1)}.`;
  }
}
