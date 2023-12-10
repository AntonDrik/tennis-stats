import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'


export class HasUnfinishedTourException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(
            `Имеется незавершенный тур. Завершите последний тур чтобы начать новый`,
            HttpStatus.INTERNAL_SERVER_ERROR,
            options
        )
    }
}