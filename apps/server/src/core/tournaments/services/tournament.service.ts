import { Injectable } from '@nestjs/common';
import {
  CreateTourDto,
  GetTournamentsQuery,
  IdDto,
  StartTournamentDto,
  TournamentRegistrationDto,
  UpsertTournamentDto,
} from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import {
  UnableUpdateTournamentException,
  UsersAlreadyJoinedTournamentException,
  UsersLimitExceedException,
} from '../../../common/exceptions';
import {
  UnableAddTourException,
  UnableRemoveTourException,
} from '../../../common/exceptions/tour.exceptions';
import { LeaderboardService } from '../../leaderboard';
import { RatingService } from '../../rating';
import TournamentSystemsFacade from '../../tournament-systems/services/facade.service';
import { TourRepository } from '../../tours';
import { UsersRepository } from '../../users';
import checkStatus from '../helpers/check-tournament-status';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class TournamentService {
  constructor(
    private dataSource: DataSource,
    private repository: TournamentsRepository,
    private usersRepository: UsersRepository,
    private tourRepository: TourRepository,
    private leaderboardService: LeaderboardService,
    private ratingService: RatingService,
    private tournamentSystemsFacade: TournamentSystemsFacade
  ) {}

  public getTournamentsList(query: GetTournamentsQuery) {
    return this.repository.findTournamentsByQuery(query);
  }

  /**
   * Создание турнира
   */
  public async createTournament(dto: UpsertTournamentDto): Promise<Tournament> {
    const tourEntity = this.repository.createEntity(dto);
    await tourEntity.save();

    return tourEntity;
  }

  /**
   * Завершение регистрации и старт турнира
   */
  public async startTournament(tournament: Tournament, dto: StartTournamentDto) {
    checkStatus(tournament, [ETournamentStatus.REGISTRATION]);

    const entity = await this.tournamentSystemsFacade.initialize(tournament, dto);

    entity.handleRating = dto.handleRating;
    entity.status = ETournamentStatus.ACTIVE;

    await entity.save();

    return entity;
  }

  /**
   * Завершение турнира. Сохранение первой тройки лидеров
   */
  public async finishTournament(tournament: Tournament) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE, ETournamentStatus.PLAYOFF]);

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
   * Редактирование, доступно только на стадии регистрации
   */
  public async editTournament(tournament: Tournament, dto: UpsertTournamentDto) {
    checkStatus(tournament, [ETournamentStatus.REGISTRATION]);

    if (tournament.registeredUsers.length > dto.playersCount) {
      throw new UnableUpdateTournamentException();
    }

    tournament.playersCount = dto.playersCount;
    await tournament.save();

    return tournament;
  }

  /**
   * Удаляет турнир и все связанные записи. НЕ сбрасывает уже подсчитанный рейтинг игроков
   */
  public async deleteTournament(tournament: Tournament) {
    await tournament.remove();
  }

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

    tournament.registeredUsers = tournament.registeredUsers.filter(
      (user) => user.id !== dto.id
    );

    await tournament.save();
  }

  /**
   * Добавляет тур в турнир. Логика добавления разная в зависимости от турнирной системы
   */
  public async addTour(tournament: Tournament, dto: CreateTourDto) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE], new UnableAddTourException());

    const tour = await this.tournamentSystemsFacade.createNewTour(tournament, dto);

    tournament.tours.push(tour);
    await tournament.save();

    return tour;
  }

  /**
   * Удаляет тур из турнира
   */
  public async removeTour(tournament: Tournament, tour: Tour | number) {
    if (tournament.status !== ETournamentStatus.ACTIVE) {
      throw new UnableRemoveTourException();
    }

    if (typeof tour === 'number') {
      tour = await this.tourRepository.findById(tour);
    }

    await tour.remove();

    return tour;
  }
}

export default TournamentService;
