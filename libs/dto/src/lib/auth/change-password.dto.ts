import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { IsEqualTo } from '../custom-decorators/is-equal-to';

class ChangePasswordDto {
  @IsPositive()
  userId: number;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Обязательное поле' })
  newPassword: string;

  @IsString()
  @IsEqualTo('newPassword')
  @IsNotEmpty({ message: 'Обязательное поле' })
  confirmPassword: string;
}

export default ChangePasswordDto;
