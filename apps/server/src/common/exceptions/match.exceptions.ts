import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'


export class MatchNotFoundException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(`Матч не найден`, HttpStatus.NOT_FOUND, options)
    }
}