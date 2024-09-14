import { IsString } from 'class-validator'


class LoginDto {
    
    @IsString()
    login: string
    
    @IsString()
    password: string
    
}

export default LoginDto