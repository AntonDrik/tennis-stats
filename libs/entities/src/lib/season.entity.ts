import { dbDateFormat } from '@tennis-stats/helpers';
import { ESeasonStatus, ETournamentStatus, ISeason } from '@tennis-stats/types';
import { format } from 'date-fns/format';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Season extends BaseEntity implements ISeason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', { nullable: false })
  startDate: Date;

  @Column('datetime', { nullable: false })
  endDate: Date;

  @Column('varchar', { default: ETournamentStatus.REGISTRATION })
  status: ESeasonStatus;

  public getDatesInSqlFormat() {
    return {
      startDate: format(this.startDate, dbDateFormat),
      endDate: format(this.endDate, dbDateFormat),
    };
  }
}
