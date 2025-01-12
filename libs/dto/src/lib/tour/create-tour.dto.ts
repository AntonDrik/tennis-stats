import { IsNumber, Max, Min } from 'class-validator';

class CreateTourDto {
  @IsNumber()
  @Max(5, { message: 'Максимум 5 сетов' })
  @Min(1, { message: 'Минимум 1 сет' })
  setsCount: number;
}

export default CreateTourDto;
