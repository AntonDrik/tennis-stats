import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Tournament } from '@tennis-stats/entities';
import { EntityManager, Equal } from 'typeorm';
import { TournamentNotFoundException } from '../../../common/exceptions';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class TournamentPipe implements PipeTransform {
  constructor(private entity: EntityManager) {}

  async transform(value: number): Promise<Tournament | null> {
    const tournament = await this.entity.getRepository(Tournament).findOne({
      where: { id: Equal(value) },
      order: {
        tours: {
          id: 'ASC',
          matches: {
            id: 'ASC',
            gameSets: {
              id: 'ASC',
            },
          },
        },
        registeredUsers: {
          rating: 'DESC',
        },
      },
    });

    if (!tournament) {
      throw new TournamentNotFoundException();
    }

    return tournament;
  }
}

const TournamentDecorator = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().params[param];
  }
);

export const TournamentById = (params = 'id') =>
  TournamentDecorator(params, TournamentPipe);
