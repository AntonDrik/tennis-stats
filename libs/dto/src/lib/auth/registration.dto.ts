import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

class RegistrationDto {
  @IsString()
  @MinLength(3, { message: 'Минимальная длина ника 3 символов' })
  @MaxLength(20, { message: 'Максимальная длина ника 20 символов' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  nickname: string;

  @IsNumber()
  @Min(100, { message: 'Минимальный рейтинг 100' })
  @Max(1500, { message: 'Максимальный рейтинг 1500' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  rating: number;

  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Только английские символы и цифры' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле' })
  password: string;
}

export default RegistrationDto;
