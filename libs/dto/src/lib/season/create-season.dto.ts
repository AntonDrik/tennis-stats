import { IsString } from 'class-validator';
import { parse } from 'date-fns/parse';
import { set } from 'date-fns/set';
import { IsTogetherOnly } from '../common/is-together-only';
import { IsDateGreaterThan } from '../custom-decorators/is-date-greater';

class CreateSeasonDto {
  // 'dd-MM-yyyy'
  @IsString()
  @IsTogetherOnly('endDate')
  startDate: string;

  // 'dd-MM-yyyy'
  @IsString()
  @IsTogetherOnly('startDate')
  @IsDateGreaterThan('startDate')
  endDate: string;

  public parseDates() {
    return {
      startDate: set(parse(this.startDate, 'dd-MM-yyyy', new Date()), {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }),
      endDate: set(parse(this.endDate, 'dd-MM-yyyy', new Date()), {
        hours: 23,
        minutes: 0,
        seconds: 0,
      }),
    };
  }
}

export default CreateSeasonDto;
