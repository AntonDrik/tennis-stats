import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class UnableUpsertSeasonException extends HttpException {
  constructor(reason?: string, options?: HttpExceptionOptions) {
    super(
      `Нельзя создать/редактировать сезон ${reason ? `. Причина: ${reason}` : ''}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class DateOutOfSeasonException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      `Дата выходит за пределы активного сезона. Завершите текущий сезон и создайте новый`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}
