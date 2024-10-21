import { ETourType, ITour, TPlayOffStage } from '@tennis-stats/types';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.entity';
import { Tournament } from './tournament.entity';

@Entity()
export class Tour extends BaseEntity implements ITour {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  tournament: Tournament;

  @Column('varchar', { nullable: false })
  type: ETourType;

  @Column('varchar', { nullable: false })
  setsCount: number;

  @OneToMany(() => Match, (match) => match.tour, {
    eager: true,
    cascade: true,
  })
  matches: Match[];

  @Column('int', { nullable: true })
  number?: number;

  @Column('varchar', { nullable: true })
  playOffStage?: TPlayOffStage;
}
