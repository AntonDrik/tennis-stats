import { IsString } from 'class-validator';

class GetRatingHistoryQuery {
  @IsString()
  year: string;
}

export default GetRatingHistoryQuery;
