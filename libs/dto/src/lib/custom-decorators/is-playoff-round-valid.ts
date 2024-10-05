import { TPlayOffRound } from '@tennis-stats/types';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsPlayoffRoundValid(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPlayoffRoundValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: TPlayOffRound, args: ValidationArguments) {
          const activeUsersIds = (args.object as any)['activeUsersIds'];

          // if (value === 'all') {
          //   return activeUsersIds.length > 1;
          // }

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
