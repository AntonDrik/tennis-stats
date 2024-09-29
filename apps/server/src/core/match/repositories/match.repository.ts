import { Injectable } from '@nestjs/common';
import { Match } from '@tennis-stats/entities';
import { DataSource, Repository } from 'typeorm';
import { MatchNotFoundException } from '../../../common/exceptions';

@Injectable()
class MatchRepository extends Repository<Match> {
  constructor(dataSource: DataSource) {
    super(Match, dataSource.createEntityManager());
  }

  public async findOneById(id: number): Promise<Match> {
    const match = await this.findOne({
      relations: ['tour'],
      where: { id },
    });

    if (!match) {
      throw new MatchNotFoundException();
    }

    return match;
  }
}

export default MatchRepository;
