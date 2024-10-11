import { dbDateFormat } from '@tennis-stats/helpers';
import { IsISO8601, IsOptional } from 'class-validator';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { IsTogetherOnly } from './is-together-only';

class DateRangeQuery {
  // UTC date format. Fill this field using zonedTimeToUtc(new Date(), 'Asia/Dubai').toISOString()
  @IsISO8601()
  @IsOptional()
  @IsTogetherOnly<DateRangeQuery>('endDate')
  startDate: string;

  // UTC date format. Fill this field using zonedTimeToUtc(new Date(), 'Asia/Dubai').toISOString()
  @IsISO8601()
  @IsOptional()
  @IsTogetherOnly<DateRangeQuery>('startDate')
  endDate: string;

  // Return dates in server timezone
  public parseDates() {
    return {
      startDate: parseISO(this.startDate),
      endDate: parseISO(this.endDate),
    };
  }

  // Return dates in server timezone with database format
  public transformDatesToDBFormat() {
    const { startDate, endDate } = this.parseDates();
    return {
      startDate: format(startDate, dbDateFormat),
      endDate: format(endDate, dbDateFormat),
    };
  }
}

export default DateRangeQuery;
