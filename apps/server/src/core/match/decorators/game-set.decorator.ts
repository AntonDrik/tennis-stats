import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GameSet } from '@tennis-stats/entities';
import { EntityManager } from 'typeorm';
import { GameSetNotFoundException } from '../../../common/exceptions';

@Injectable()
export class GameSetPipe implements PipeTransform {
  constructor(private entity: EntityManager) {}

  async transform(value: number): Promise<GameSet | null> {
    const gameSet = await this.entity
      .getRepository(GameSet)
      .findOneBy({ id: value });

    if (!gameSet) {
      throw new GameSetNotFoundException();
    }

    return gameSet;
  }
}

const GameSetDecorator = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().params[param];
  }
);

export const GameSetById = (params = 'setId') =>
  GameSetDecorator(params, GameSetPipe);
