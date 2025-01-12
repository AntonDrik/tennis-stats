import { Injectable } from '@nestjs/common';
import { IdDto, TournamentRegistrationDto } from '@tennis-stats/dto';
import { Match, Tournament } from '@tennis-stats/entities';
import { allSynchronously } from '@tennis-stats/helpers';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import {
  UnableAddUserToTournamentException,
  UsersAlreadyJoinedTournamentException,
  UsersLimitExceedException,
} from '../../../common/exceptions';
import { IPair } from '../../../common/types';
import { MatchService } from '../../match';
import { UsersRepository } from '../../users';
import checkStatus from '../helpers/check-tournament-status';

/**
 * Сервис с общими методами для турнира.
 */
@Injectable()
class TournamentUsersManagerService {
  constructor(
    private dataSource: DataSource,
    private usersRepository: UsersRepository,
    private matchService: MatchService
  ) {}

  /**
   * Регистрирует пользователей на турнир. Доступно только на стадии регистрации
   */
  public async joinTournament(tournament: Tournament, dto: TournamentRegistrationDto) {
    checkStatus(tournament, [ETournamentStatus.REGISTRATION]);

    const { isUsersLengthExceed, intersectedUsers } = dto.validate(tournament);

    if (isUsersLengthExceed) {
      throw new UsersLimitExceedException();
    }

    if (intersectedUsers.length) {
      throw new UsersAlreadyJoinedTournamentException(intersectedUsers);
    }

    const users = await this.usersRepository.findByIds(dto.usersIds);

    tournament.registeredUsers.push(...users);
    await tournament.save();
  }

  /**
   * Отменяет регистрацию пользователей на турнир. Доступно только на стадии регистрации
   */
  public async leaveTournament(tournament: Tournament, dto: IdDto) {
    checkStatus(tournament, [ETournamentStatus.REGISTRATION]);

    tournament.registeredUsers = tournament.registeredUsers.filter((user) => user.id !== dto.id);

    await tournament.save();
  }

  /**
   * Добавляет пользователя в запущенный турнир
   */
  public async addUserToActiveTournament(tournament: Tournament, dto: IdDto) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE]);

    if (tournament.hasPlayoff) {
      throw new UnableAddUserToTournamentException();
    }

    const newUser = await this.usersRepository.findById(dto.id);
    const systemUser = tournament.helpers.getSystemUser();

    await this.dataSource.transaction(async (manager) => {
      if (systemUser) {
        const systemUserMatches = tournament.helpers.getUserMatches(systemUser.id);

        await allSynchronously(
          systemUserMatches.map((match) => async () => {
            const entity = this.matchService.replaceUser(match, systemUser, newUser);

            await manager.save(Match, entity);
          })
        );

        tournament.registeredUsers = tournament.registeredUsers.filter(
          (user) => user.id !== systemUser.id
        );
      } else {
        const halyava = await this.usersRepository.findByNickname('Халява');

        const pair: IPair = { user1: newUser, user2: halyava };

        const updatedTours = tournament.tours.map((tour) => {
          const setsCount = tour.helpers.getSetsCount();
          const match = this.matchService.createMatches([pair], setsCount)[0];

          tour.matches.push(match);

          return tour;
        });

        tournament.tours = updatedTours;
        tournament.registeredUsers.push(halyava);
      }

      tournament.registeredUsers.push(newUser);
      await manager.save(Tournament, tournament);
    });
  }
}

export default TournamentUsersManagerService;
