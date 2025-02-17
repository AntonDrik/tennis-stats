import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Tournament } from '@tennis-stats/entities';
import { EntityManager, Equal } from 'typeorm';
import { TournamentNotFoundException } from '../../../common/exceptions';

@Injectable()
class TournamentPipe implements PipeTransform {
  constructor(private entity: EntityManager) {}

  async transform(value: number | undefined): Promise<Tournament | null> {
    if (value === undefined || value === -1) {
      throw new BadRequestException('Неверный Tournament Id');
    }

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

const TournamentDecorator = createParamDecorator((param: string, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().params[param];
});

export const TournamentById = (params = 'id') => TournamentDecorator(params, TournamentPipe);
