import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Tour } from '@tennis-stats/entities';
import { EntityManager } from 'typeorm';
import { TourNotFoundException } from '../../../common/exceptions/tour.exceptions';

@Injectable()
export class TourPipe implements PipeTransform {
  constructor(private entity: EntityManager) {}

  async transform(value: number): Promise<Tour | null> {
    const tour = await this.entity.getRepository(Tour).findOneBy({ id: value });

    if (!tour) {
      throw new TourNotFoundException();
    }

    return tour;
  }
}

const TourDecorator = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().params[param];
  }
);

export const TourById = (params = 'tourId') => TourDecorator(params, TourPipe);
