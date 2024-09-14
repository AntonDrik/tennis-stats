import { IStatsDictionary } from '@tennis-stats/types';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class StatsDictionary extends BaseEntity implements IStatsDictionary {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
