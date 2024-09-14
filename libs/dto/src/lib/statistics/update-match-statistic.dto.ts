import { IsNumber, Min } from 'class-validator';


class UpdateMatchStatisticDto {

  @IsNumber()
  id: number;

  @IsNumber()
  @Min(0)
  value: number;

}

export default UpdateMatchStatisticDto;
