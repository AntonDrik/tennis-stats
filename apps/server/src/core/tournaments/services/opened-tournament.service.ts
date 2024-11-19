import { Injectable } from '@nestjs/common';
import {
  IdDto,
  StartTournamentDto,
  TournamentRegistrationDto,
  UpsertTournamentDto,
} from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { arrayIntersections } from '@tennis-stats/helpers';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import {
  UnableUpdateTournamentException,
  UsersLimitTournamentException,
  UsersRegisteredInTournamentException,
} from '../../../common/exceptions';
import { LeaderboardService } from '../../leaderboard';
import { MatchService } from '../../match';
import { PairsGeneratorService } from '../../pairs-generator';
import { RatingService } from '../../rating';
import ToursRepository from '../../tours/repository/tours.repository';
import { UsersRepository, UsersService } from '../../users';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class OpenedTournamentService {
  constructor(
    private dataSource: DataSource,
    private repository: TournamentsRepository,
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private toursRepository: ToursRepository,
    private matchService: MatchService,
    private leaderboardService: LeaderboardService,
    private ratingService: RatingService,
    private pairsGeneratorService: PairsGeneratorService
  ) {}

  public getOpenedToRegistrationTournament() {
    return this.repository.findByStatus([ETournamentStatus.REGISTRATION]);
  }

  /**
   * Завершение регистрации и старт турнира
   */
  public async startTournament(dto: StartTournamentDto) {
    const tournament = await this.getOpenedToRegistrationTournament();
    const users = await this.usersService.getJoinedUsers(tournament);

    const pairs = this.pairsGeneratorService.generateByRating(users);
    const matches = await this.matchService.createMatches(pairs, dto.setsCount);
    const tour = this.toursRepository.createSimpleTourEntity(dto.setsCount, 1, matches);

    tournament.tours = [tour];
    tournament.handleRating = dto.handleRating;
    tournament.status = ETournamentStatus.ACTIVE;

    await tournament.save();

    return tournament;
  }

  /**
   * Завершение турнира. Сохранение первой тройки лидеров
   */
  public async finishTournament() {
    const tournament = await this.repository.findByStatus(
      [ETournamentStatus.ACTIVE, ETournamentStatus.PLAYOFF],
      'Не найден открытый турнир'
    );

    await this.dataSource.transaction(async (manager) => {
      await this.leaderboardService.saveLeaderboard(tournament, manager);

      if (tournament.handleRating) {
        await this.ratingService.calculateAndSaveRating(tournament, manager);
      }

      await manager.update(
        Tournament,
        { id: tournament.id },
        { status: ETournamentStatus.FINISHED }
      );
    });

    return tournament;
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

  public async deleteTournament() {
    const tournament = await this.repository.findByStatus(
      [ETournamentStatus.ACTIVE, ETournamentStatus.REGISTRATION],
      'Не найден открытый турнир'
    );

    await tournament.remove();
  }

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