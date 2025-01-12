import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class TourNotFoundException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(`Тур не найден`, HttpStatus.NOT_FOUND, options);
  }
}

export class UnableAddTourException extends HttpException {
  constructor(message?: string, options?: HttpExceptionOptions) {
    super(
      message ?? 'Нельзя добавить тур. Турнир неактивен',
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class MaxToursExceedException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      'Достигнуто максимальное количество туров',
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class UnableRemoveTourException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      'Нельзя удалить тур. Турнир неактивен',
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}
