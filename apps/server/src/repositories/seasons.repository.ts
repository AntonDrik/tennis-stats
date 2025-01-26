import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from '@tennis-stats/dto';
import { Season } from '@tennis-stats/entities';
import { ESeasonStatus } from '@tennis-stats/types';
import { DataSource, Repository } from 'typeorm';

@Injectable()
class SeasonsRepository extends Repository<Season> {
  constructor(dataSource: DataSource) {
    super(Season, dataSource.createEntityManager());
  }

  public async findLastFinished(): Promise<Season | null> {
    const seasons = await this.find({
      where: { status: ESeasonStatus.FINISHED },
      order: { id: 'DESC' },
    });

    return seasons[0] ?? null;
  }

  public getActiveSeason(): Promise<Season | null> {
    return this.findOneBy({ status: ESeasonStatus.ACTIVE });
  }

  public hasActiveSeason(): Promise<boolean> {
    return this.existsBy({ status: ESeasonStatus.ACTIVE });
  }

  public createEntity(dto: CreateSeasonDto): Season {
    const season = new Season();

    const { startDate, endDate } = dto.parseDates();

    season.startDate = startDate;
    season.endDate = endDate;
    season.status = ESeasonStatus.ACTIVE;

    return season;
  }
}

export default SeasonsRepository;
