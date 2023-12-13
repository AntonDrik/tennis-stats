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

export class TourNotFoundException extends HttpException {
    constructor(options?: HttpExceptionOptions) {
        super(`Тур не найден`, HttpStatus.INTERNAL_SERVER_ERROR, options)
    }
}

export class UnableCancelTourException extends HttpException {
    constructor(message: string, options?: HttpExceptionOptions) {
        super(`Ошибка при попытке отменить тур: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR, options)
    }
}