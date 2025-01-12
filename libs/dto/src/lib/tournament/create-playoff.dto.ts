import { IsNumber, Max, Min } from 'class-validator';
import PlayoffStartOptionsDto from './playoff-start-options.dto';

class CreatePlayoffDto extends PlayoffStartOptionsDto {
  @IsNumber()
  @Max(5, { message: 'Максимум 5 сетов' })
  @Min(1, { message: 'Минимум 1 сет' })
  setsCount: number;
}

export default CreatePlayoffDto;
