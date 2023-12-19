import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { LoginDto } from '@tennis-stats/dto'


@Controller('auth')
class AuthController {
    
    @Post('/login')
    login(@Body() dto: LoginDto) {
        const isValid = dto.password === 'test123'
        
        if (!isValid) {
            throw new HttpException('Пароль неверный', HttpStatus.BAD_REQUEST)
        }
        
        return true
    }
    
}

export default AuthController