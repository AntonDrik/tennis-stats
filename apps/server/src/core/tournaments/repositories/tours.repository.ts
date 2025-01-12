import { Injectable } from '@nestjs/common';
import { Match, Tour } from '@tennis-stats/entities';
import { ETourType, TPlayOffStage } from '@tennis-stats/types';
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

  public createSimpleTourEntity(number: number, matchEntities: Match[]): Tour {
    const tour = new Tour();

    tour.type = ETourType.SIMPLE;
    tour.number = number;
    tour.matches = matchEntities;

    return tour;
  }

  public createPlayOffTourEntity(stage: TPlayOffStage, matchEntities: Match[]): Tour {
    const tour = new Tour();

    tour.type = ETourType.PLAY_OFF;
    tour.playOffStage = stage;
    tour.matches = matchEntities;

    return tour;
  }
}

export default ToursRepository;
