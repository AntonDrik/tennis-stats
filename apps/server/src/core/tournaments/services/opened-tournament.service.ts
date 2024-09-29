import { Injectable } from '@nestjs/common';
import {
  IdDto,
  StartTournamentDto,
  TournamentRegistrationDto,
  UpsertTournamentDto,
} from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { allSynchronously, arrayIntersections } from '@tennis-stats/helpers';
import { ETournamentStatus } from '@tennis-stats/types';
import {
  UnableUpdateTournamentException,
  UsersLimitTournamentException,
  UsersRegisteredInTournamentException,
} from '../../../common/exceptions';
import { MatchService } from '../../match';
import ToursRepository from '../../tours/repository/tours.repository';
import { UsersRepository, UsersService } from '../../users';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class OpenedTournamentService {
  constructor(
    private repository: TournamentsRepository,
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private toursRepository: ToursRepository,
    private matchService: MatchService
  ) {}

  public getOpenedToRegistrationTournament() {
    return this.repository.findByStatus(ETournamentStatus.REGISTRATION);
  }

  /**
   * Редактирование доступно только на стадии регистрации
   */
  public async editTournament(dto: UpsertTournamentDto): Promise<Tournament> {
    const tournament = await this.getOpenedToRegistrationTournament();

    if (tournament.registeredUsers.length > dto.playersCount) {
      throw new UnableUpdateTournamentException();
    }

    tournament.playersCount = dto.playersCount;
    await tournament.save();

    return tournament;
  }

  /**
   * Завершение регистрации и старт турнира
   */
  public async startTournament(dto: StartTournamentDto) {
    const tournament = await this.getOpenedToRegistrationTournament();
    const users = await this.usersService.getUsersForTournament(
      dto.registeredUsersIds
    );

    const tours = allSynchronously(
      dto.tours.map((tourDto, index) => async () => {
        const matches = await this.matchService.createMatches(users, tourDto);

        return this.toursRepository.createSimpleTourEntity(
          tourDto,
          index + 1,
          matches
        );
      })
    );

    tournament.tours = await tours;
    tournament.handleRating = dto.handleRating;
    tournament.status = ETournamentStatus.ACTIVE;

    await tournament.save();

    return tournament;
  }

  public finishTournament() {}

  /**
   * Регистрирует пользователей на турнир. Доступно только на стадии регистрации
   */
  public async registerUsersOnTournament(dto: TournamentRegistrationDto) {
    const users = await this.usersRepository.findByIds(dto.usersIds);
    const tournament = await this.getOpenedToRegistrationTournament();

    if (
      tournament.playersCount <
      tournament.registeredUsers.length + dto.usersIds.length
    ) {
      throw new UsersLimitTournamentException();
    }

    const usersIds = tournament.registeredUsers.map((user) => user.id);
    const intersections = arrayIntersections(dto.usersIds, usersIds);

    if (intersections.length) {
      throw new UsersRegisteredInTournamentException(
        intersections,
        tournament.registeredUsers
      );
    }

    tournament.registeredUsers.push(...users);

    await tournament.save();
  }

  /**
   * Отменяет регистрацию пользователей на турнир. Доступно только на стадии регистрации
   */
  public async unregisterUserFromTournament(dto: IdDto) {
    const tournament = await this.getOpenedToRegistrationTournament();

    tournament.registeredUsers = tournament.registeredUsers.filter(
      (user) => user.id !== dto.id
    );
    await tournament.save();
  }
}

export default OpenedTournamentService;
