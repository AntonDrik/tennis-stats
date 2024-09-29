import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';
import { IUser } from '@tennis-stats/types';

export class HasUnfinishedTournamentException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      `Имеется незавершенный турнир`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class TournamentNotFoundException extends HttpException {
  constructor(error?: string, options?: HttpExceptionOptions) {
    super(error ?? `Турнир не найден`, HttpStatus.NOT_FOUND, options);
  }
}

export class OpenedTournamentNotFoundException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      `Открытый к регистрации турнир не найден`,
      HttpStatus.NOT_FOUND,
      options
    );
  }
}

export class UsersRegisteredInTournamentException extends HttpException {
  constructor(
    usersIds: number[],
    tournamentUsers: IUser[],
    options?: HttpExceptionOptions
  ) {
    const invalidNicknames = tournamentUsers
      .filter((user) => usersIds.includes(user.id))
      .map((user) => user.nickname)
      .join(', ');

    super(
      `Данные пользователи уже зарегистрированы на турнире: [${invalidNicknames}]`,
      HttpStatus.NOT_FOUND,
      options
    );
  }
}

export class UsersLimitTournamentException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      `Достигнуто максимальное количество пользователей в турнире`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class UnableUpdateTournamentException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(
      `Неудалось обновить турнир`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class UnableCancelTournamentException extends HttpException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(
      `Ошибка при попытке отменить турнир: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}

export class UnableDeleteTournamentException extends HttpException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(
      `Ошибка при попытке удалить турнир: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      options
    );
  }
}
