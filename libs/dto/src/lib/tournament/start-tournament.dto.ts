import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import CreateTourDto from '../tour/create-tour.dto';

class StartTournamentDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  registeredUsersIds: number[];

  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  handleRating: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateTourDto)
  @ValidateNested()
  tours: CreateTourDto[];
}

export default StartTournamentDto;
