import { IsNumber } from 'class-validator';

class SwapUserDto {
  @IsNumber()
  currentUserId: number;

  @IsNumber()
  newUserId: number;
}

export default SwapUserDto;
