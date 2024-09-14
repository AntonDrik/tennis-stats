import { Injectable } from '@nestjs/common';
import { CreateTourDto, GetToursQuery, IdDto } from '@tennis-stats/dto';
import { Match, PlayerStat, StatsDictionary, Tour } from '@tennis-stats/entities';
import { DataSource, EntityManager } from 'typeorm';
import { HasUnfinishedTourException, UnableCancelTourException } from '../../common/exceptions';
import { MatchOrderService } from '../match-order';
import { GameSetService, MatchService } from './modules/match';
import ToursRepository from './tours.repository';


@Injectable()
class ToursService {

  constructor(
    private repository: ToursRepository,
    private dataSource: DataSource,
    private matchService: MatchService,
    private gameSetService: GameSetService,
    private matchOrderService: MatchOrderService
  ) {}

  public getToursList(query: GetToursQuery) {
    return this.repository.getToursByQuery(query);
  }

  public getTour(id: number) {
    return this.repository.findById(id);
  }

  public async createTour(dto: CreateTourDto): Promise<Tour> {
    const lastTour = await this.repository.findLast();

    if (lastTour?.isActive) {
      throw new HasUnfinishedTourException();
    }

    const matches = await this.matchService.getMatchesForTour(dto);
    const orderedMatches = await this.matchOrderService.applyOrder(matches, true);

    const tourEntity = this.repository.createEntity(dto, orderedMatches);

    await this.dataSource.transaction(async (manager) => {
      await manager.save(Tour, tourEntity);

      await this.createStatsForTour(matches, manager);
    });

    return tourEntity;
  }

  public async cancelTour(dto: IdDto): Promise<Tour> {
    const tour = await this.repository.findById(dto.id);

    await this.gameSetService.cancelUnfinishedGameSets(tour)
      .catch((err: Error) => {
        throw new UnableCancelTourException(err.message);
      });

    return tour;
  }

  private async createStatsForTour(matches: Match[], transactionManager: EntityManager) {
    const allStats = await transactionManager.find(StatsDictionary);

    const statList = matches.map((match) => {
      return allStats.map((stat) => {
        const user1Stats = new PlayerStat();
        user1Stats.stat = stat;
        user1Stats.match = match;
        user1Stats.user = match.user1;
        user1Stats.count = 0;

        const user2Stats = new PlayerStat();
        user2Stats.stat = stat;
        user2Stats.match = match;
        user2Stats.user = match.user2;
        user2Stats.count = 0;

        return [user1Stats, user2Stats];
      });
    });

    await transactionManager.insert(PlayerStat, statList.flat(2));
  }

}


export default ToursService;
