import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSeasonDto, ExtendSeasonDto, GetSeasonsQuery } from '@tennis-stats/dto';
import { toZonedTime } from 'date-fns-tz';
import { Season, Tournament } from '@tennis-stats/entities';
import { allSynchronously, clientTimezone } from '@tennis-stats/helpers';
import { ESeasonStatus, ISeasonWithStats } from '@tennis-stats/types';
import { isBefore } from 'date-fns/isBefore';
import { isEqual } from 'date-fns/isEqual';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { set } from 'date-fns/set';
import { DateOutOfRangeException, UnableUpsertSeasonException } from '../../../common/exceptions';
import { TournamentsRepository } from '../../../repositories';
import SeasonsRepository from '../../../repositories/seasons.repository';
import getSeasonLeaderboard from '../helpers/get-season-leaderboard';
import getSeasonStats from '../helpers/get-season-stats';

@Injectable()
class SeasonsService {
  constructor(
    private seasonsRepository: SeasonsRepository,
    private tournamentsRepository: TournamentsRepository
  ) {}

  public async getSeasons(query: GetSeasonsQuery): Promise<Season[]> {
    const builder = this.seasonsRepository.createQueryBuilder();

    if (query.year) {
      builder
        .where('YEAR(startDate) = :year', { year: query.year })
        .andWhere('YEAR(endDate) = :year', { year: query.year });
    }

    return builder.getMany();
  }

  public async getSeasonsWithStats(): Promise<ISeasonWithStats[]> {
    const allSeasons = await this.seasonsRepository.find({ order: { id: 'DESC' } });

    return allSynchronously(
      allSeasons.map((season) => async () => {
        const seasonTournaments = await this.tournamentsRepository.findTournamentsByQuery({
          withMatches: true,
          seasonId: season.id,
          withJoinedUsers: true,
          withLeaderboard: season.status === ESeasonStatus.FINISHED,
        });

        return {
          ...season,
          stats: getSeasonStats(seasonTournaments),
          tournamentsCount: seasonTournaments.length,
          leaderboard: getSeasonLeaderboard(seasonTournaments),
        };
      })
    );
  }

  public getActiveSeason(): Promise<Season | null> {
    return this.seasonsRepository.getActiveSeason();
  }

  public getLastFinishedSeason(): Promise<Season | null> {
    return this.seasonsRepository.findLastFinished();
  }

  public async createSeason(dto: CreateSeasonDto): Promise<void> {
    const hasActiveSeason = await this.seasonsRepository.hasActiveSeason();

    if (hasActiveSeason) {
      throw new UnableUpsertSeasonException('Есть активный сезон');
    }

    const entity = this.seasonsRepository.createEntity(dto);

    await this.checkIsValidStartDate(entity.startDate);
    await entity.save();
  }

  public async extendSeason(id: number, dto: ExtendSeasonDto): Promise<void> {
    const season = await this.seasonsRepository.findOneBy({ id });

    if (!season) {
      throw new NotFoundException('Сезон не найден');
    }

    if (season.status === ESeasonStatus.FINISHED) {
      throw new InternalServerErrorException('Сезон завершен');
    }

    season.endDate = dto.parseDates().endDate;

    await season.save();
  }

  public async finishSeason(id: number): Promise<void> {
    await this.seasonsRepository.update(id, {
      status: ESeasonStatus.FINISHED,
      endDate: set(toZonedTime(new Date(), clientTimezone), {
        hours: 23,
        minutes: 0,
        seconds: 0,
      }),
    });
  }

  public async deleteSeason(id: number): Promise<void> {
    await this.seasonsRepository.delete(id);
  }

  public async attachActiveSeason(tournament: Tournament): Promise<Tournament> {
    const activeSeason = await this.getActiveSeason();

    if (!activeSeason) {
      return tournament;
    }

    const interval = { start: activeSeason.startDate, end: activeSeason.endDate };
    const tournamentDate = toZonedTime(tournament.date, clientTimezone);

    if (!isWithinInterval(tournamentDate, interval)) {
      throw new DateOutOfRangeException();
    }

    tournament.season = activeSeason;

    return tournament;
  }

  private async checkIsValidStartDate(startDate: Date): Promise<void> {
    const lastSeason = await this.getLastFinishedSeason();

    if (!lastSeason) {
      return;
    }

    if (isBefore(startDate, lastSeason.endDate) || isEqual(startDate, lastSeason.endDate)) {
      throw new UnableUpsertSeasonException('Дата начала попадает в предыдущий сезон');
    }
  }
}

export default SeasonsService;
