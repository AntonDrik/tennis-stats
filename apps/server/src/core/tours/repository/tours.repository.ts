import { Injectable } from '@nestjs/common';
import { CreateTourDto } from '@tennis-stats/dto';
import { Match, Tour, Tournament } from '@tennis-stats/entities';
import { ETourType, TPlayOffRound } from '@tennis-stats/types';
import { DataSource, Repository } from 'typeorm';
import { TournamentNotFoundException } from '../../../common/exceptions';

@Injectable()
class ToursRepository extends Repository<Tour> {
  constructor(dataSource: DataSource) {
    super(Tour, dataSource.createEntityManager());
  }

  public async findById(id: number): Promise<Tour> {
    const tour = await this.findOneBy({ id });

    if (!tour) {
      throw new TournamentNotFoundException();
    }

    return tour as Tour;
  }

  public createSimpleTourEntity(dto: CreateTourDto, number: number, matchEntities: Match[]): Tour {
    const tour = new Tour();

    tour.type = ETourType.SIMPLE;
    tour.number = number;
    tour.setsCount = dto.setsCount;
    tour.matches = matchEntities;

    return tour;
  }

  public createPlayOffTourEntity(setsCount: number, stage: TPlayOffRound, matchEntities: Match[]): Tour {
    const tour = new Tour();

    tour.type = ETourType.PLAY_OFF;
    tour.playOffStage = stage;
    tour.setsCount = setsCount;
    tour.matches = matchEntities;

    return tour;
  }

  public executeQuery<T>(query: string): Promise<T[]> {
    return this.query(query);
  }
}

export default ToursRepository;
