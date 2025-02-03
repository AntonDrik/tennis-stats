import { IsOptional, IsString } from 'class-validator';

class GetSeasonsQuery {
  @IsString()
  @IsOptional()
  year: string;
}

export default GetSeasonsQuery;
