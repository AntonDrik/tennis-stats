import { IsString } from 'class-validator';
import { parse } from 'date-fns/parse';
import { set } from 'date-fns/set';

class ExtendSeasonDto {
  // 'dd-MM-yyyy'
  @IsString()
  endDate: string;

  public parseDates() {
    return {
      endDate: set(parse(this.endDate, 'dd-MM-yyyy', new Date()), {
        hours: 23,
        minutes: 0,
        seconds: 0,
      }),
    };
  }
}

export default ExtendSeasonDto;
