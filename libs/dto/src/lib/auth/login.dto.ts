import { IsString } from 'class-validator'


class LoginDto {
    
    @IsString()
    password: string
    
}

export default LoginDto