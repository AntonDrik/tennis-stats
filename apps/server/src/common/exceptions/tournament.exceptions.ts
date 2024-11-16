import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { ETournamentStatus } from '@tennis-stats/types';

export class HasUnfinishedTournamentException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super(`Имеется незавершенный турнир`, HttpStatus.INTERNAL_SERVER_ERROR, options);
  }
}

export class TournamentNotFoundException extends HttpException {
  constructor(error?: string, options?: HttpExceptionOptions) {
    super(error ?? `Турнир не найден`, HttpStatus.NOT_FOUND, options);
  }
}

export class TournamentNotMatchStatusException extends HttpException {
  constructor(status: ETournamentStatus, options?: HttpExceptionOptions) {
    super(
      `Неверная операция для турнира со статусом [${status}]`,
      HttpStatus.NOT_FOUND,
      options
    );
  }
}

export class UsersAlreadyJoinedTournamentException extends HttpException {
  constructor(tournamentUsers: string[], options?: HttpExceptionOptions) {
    const invalidNicknames = tournamentUsers.join(', ');

    super(
      `Данные пользователи уже зарегистрированы на турнире: [${invalidNicknames}]`,
      HttpStatus.NOT_FOUND,
      options
    );
  }
}

export class UsersLimitExceedException extends HttpException {
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
    super(`Не удалось обновить турнир`, HttpStatus.INTERNAL_SERVER_ERROR, options);
  }
}
