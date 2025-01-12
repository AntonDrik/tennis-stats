import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class MatchNotFoundException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(`Матч не найден`, HttpStatus.NOT_FOUND, options);
  }
}

export class MatchNotFinishedException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(`Матч не завершен`, HttpStatus.NOT_FOUND, options);
  }
}

export class UnableDeleteFinishedException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(`Нельзя удалить завершенный матч`, HttpStatus.NOT_FOUND, options);
  }
}

export class IsOddUsersException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      `Невозможно сгенерировать матчи. Количество участников должно быть четным`,
      HttpStatus.NOT_FOUND,
      options
    );
  }
}

export class UnableReplaceUsersInMatch extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super('Ошибка при замене пользователя', HttpStatus.INTERNAL_SERVER_ERROR, options);
  }
}
