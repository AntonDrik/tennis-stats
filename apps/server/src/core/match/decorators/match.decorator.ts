import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Match } from '@tennis-stats/entities';
import { EntityManager } from 'typeorm';
import { MatchNotFoundException } from '../../../common/exceptions';

@Injectable()
export class MatchPipe implements PipeTransform {
  constructor(private entity: EntityManager) {}

  async transform(value: number): Promise<Match | null> {
    const match = await this.entity
      .getRepository(Match)
      .findOneBy({ id: value });

    if (!match) {
      throw new MatchNotFoundException();
    }

    return match;
  }
}

const MatchDecorator = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().params[param];
  }
);

export const MatchById = (params = 'matchId') =>
  MatchDecorator(params, MatchPipe);
