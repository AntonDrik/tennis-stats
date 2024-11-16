import { Injectable } from '@nestjs/common';
import {
  GetTournamentsQuery,
  IdDto,
  StartTournamentDto,
  TournamentRegistrationDto,
  UpsertTournamentDto,
} from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import {
  HasUnfinishedTournamentException,
  UnableUpdateTournamentException,
  UsersAlreadyJoinedTournamentException,
  UsersLimitExceedException,
} from '../../../common/exceptions';
import { LeaderboardService } from '../../leaderboard';
import { MatchService } from '../../match';
import { PairsGeneratorService } from '../../pairs-generator';
import { RatingService } from '../../rating';
import ToursRepository from '../../tours/repository/tours.repository';
import { UsersRepository, UsersService } from '../../users';
import checkStatus from '../helpers/check-tournament-status';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class TournamentsService {
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

  public getTournamentsList(query: GetTournamentsQuery) {
    return this.repository.findTournamentsByQuery(query);
  }

  /**
   * Создание турнира
   */
  public async createTournament(dto: UpsertTournamentDto): Promise<Tournament> {
    const lastTournament = await this.repository.findLast();

    if (lastTournament?.isUnfinished) {
      throw new HasUnfinishedTournamentException();
    }

    const tourEntity = this.repository.createEntity(dto);
    await tourEntity.save();

    return tourEntity;
  }

  /**
   * Завершение регистрации и старт турнира
   */
  public async startTournament(tournament: Tournament, dto: StartTournamentDto) {
    checkStatus(tournament, [ETournamentStatus.REGISTRATION]);

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
}

export default TournamentsService;
