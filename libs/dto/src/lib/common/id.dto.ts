import { IsPositive } from 'class-validator';

class IdDto {
  @IsPositive()
  id: number;
}

export default IdDto;
