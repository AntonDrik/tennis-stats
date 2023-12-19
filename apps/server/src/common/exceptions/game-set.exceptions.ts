import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'


export class GameSetNotFoundException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(`Игровой сет не найден`, HttpStatus.NOT_FOUND, options)
    }
}

export class GameSetFinishedException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(`Игровой сет завершен`, HttpStatus.BAD_REQUEST, options)
    }
    
}