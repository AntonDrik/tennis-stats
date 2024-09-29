import { IsNumber } from 'class-validator';

class IdDto {
  @IsNumber()
  id: number;
}

export default IdDto;
