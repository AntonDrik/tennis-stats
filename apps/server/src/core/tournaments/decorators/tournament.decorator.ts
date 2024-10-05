import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Tournament } from '@tennis-stats/entities';
import { EntityManager } from 'typeorm';
import { TournamentNotFoundException } from '../../../common/exceptions';

@Injectable()
export class TournamentPipe implements PipeTransform {
  constructor(private entity: EntityManager) {}

  async transform(value: number): Promise<Tournament | null> {
    const tournament = await this.entity.getRepository(Tournament).findOne({
      where: { id: value },
      order: {
        tours: {
          id: 'ASC',
          matches: {
            id: 'ASC',
          },
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