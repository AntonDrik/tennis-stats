import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'


export class UserNotFoundException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(`Пользователь не найден`, HttpStatus.NOT_FOUND, options)
    }
}

export class UsersNotFoundException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(`Нет ни одного пользователя`, HttpStatus.NOT_FOUND, options)
    }
}