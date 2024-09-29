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

  transform(value: number): Promise<Tournament | null> {
    const tournament = this.entity
      .getRepository(Tournament)
      .findOneBy({ id: value });

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
