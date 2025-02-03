import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(message = 'Пароль или логин неверны', options?: HttpExceptionOptions) {
    super(message, HttpStatus.UNAUTHORIZED, options);
  }
}

export class ForbiddenException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super('Forbidden', HttpStatus.FORBIDDEN, options);
  }
}
