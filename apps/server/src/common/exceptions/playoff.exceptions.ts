import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class UnableCreatePlayoffException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      'Нельзя создать плейофф. Турнир неактивен',
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class InvalidPlayoffTypeException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      'На данный момент нельзя создать playoff с типом all',
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}
