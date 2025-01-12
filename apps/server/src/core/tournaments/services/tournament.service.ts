import { Injectable } from '@nestjs/common';
import {
  GetTournamentsQuery,
  PlayoffStartOptionsDto,
  StartTournamentDto,
  UpsertTournamentDto,
} from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus, ETournamentType } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import {
  JoinedUsersNotExistException,
  UnableUpdateTournamentException,
} from '../../../common/exceptions';
import { LeaderboardService } from '../../leaderboard';
import { RatingService } from '../../rating';
import { UsersService } from '../../users';
import checkStatus from '../helpers/check-tournament-status';
import TournamentsRepository from '../repositories/tournaments.repository';
import PlayoffTournamentService from '../systems/playoff-tournament.service';
import RoundRobinTournamentService from '../systems/round-robin-tournament.service';
import SwissTournamentService from '../systems/swiss-tournament.service';

/**
 * Сервис с общими методами для турнира.
 * Реализует основные функции турнира:
 * 1. Создание
 * 2. Редактирование (доступно только на этапе регистрации)
 * 3. Завершение турнира
 * 4. Удаление
 * 5. Регистрация на турнир
 */
@Injectable()
class TournamentService {
  constructor(
    private dataSource: DataSource,
    private repository: TournamentsRepository,
    private leaderboardService: LeaderboardService,
    private ratingService: RatingService,
    private usersService: UsersService,
    private roundRobinTournamentService: RoundRobinTournamentService,
    private swissTournamentService: SwissTournamentService,
    private playoffTournamentService: PlayoffTournamentService
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

    if (!tournament.registeredUsers.length) {
      throw new JoinedUsersNotExistException();
    }

    let entity = await this.optimizeTournamentUsers(tournament);

    if (dto.tournamentType === ETournamentType.ROUND_ROBIN) {
      entity = this.roundRobinTournamentService.initialize(entity, dto);
    }

    if (dto.tournamentType === ETournamentType.SWISS_SYSTEM) {
      entity = this.swissTournamentService.initialize(entity, dto);
    }

    if (dto.tournamentType === ETournamentType.PLAYOFF) {
      entity = await this.playoffTournamentService.createPlayoff(entity, {
        ...(dto.playoffOptions as PlayoffStartOptionsDto),
        setsCount: dto.setsCount,
      });
    }

    entity.handleRating = dto.handleRating;
    entity.status = ETournamentStatus.ACTIVE;

    await entity.save();

    return entity;
  }

  /**
   * Завершение турнира. Сохранение первой тройки лидеров
   */
  public async finishTournament(tournament: Tournament) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE]);

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
   * Добавляет халяву в турнир по необходимости
   */
  private async optimizeTournamentUsers(tournament: Tournament) {
    if (tournament.registeredUsers.length % 2 !== 0) {
      const systemUser = await this.usersService.getSystemUser();

      tournament.registeredUsers.push(systemUser);
    }

    return tournament;
  }
}

export default TournamentService;
