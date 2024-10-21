import { TPlayOffStage } from '@tennis-stats/types';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsPlayoffRoundValid(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPlayoffRoundValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: TPlayOffStage, args: ValidationArguments) {
          const activeUsersIds = (args.object as any)['activeUsersIds'];

          const roundUsersCount = Number(value?.split('/')?.[1]) * 2;

          if (!Number.isFinite(roundUsersCount)) {
            return true;
          }

          return activeUsersIds.length >= roundUsersCount;
        },
      },
    });
  };
}
