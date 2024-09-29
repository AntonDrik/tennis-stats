import {
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

class RegistrationDto {
  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле' })
  nickname: string;

  @IsNumber()
  @Min(100)
  @IsNotEmpty({ message: 'Обязательное поле' })
  rating: number;

  @IsHexColor()
  @IsNotEmpty({ message: 'Обязательное поле' })
  color: string;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле' })
  password: string;
}

export default RegistrationDto;
