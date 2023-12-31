import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'


export class InvalidCredentialsException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super('Пароль или логин неверны', HttpStatus.UNAUTHORIZED, options)
    }
}