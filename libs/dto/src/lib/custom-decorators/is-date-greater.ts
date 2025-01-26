import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { parse } from 'date-fns/parse';

export function IsDateGreaterThan<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsDateGreatherThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, string>)?.[relatedPropertyName];

          const formattedDate1 = parse(value, 'dd-MM-yyyy', new Date());
          const formattedDate2 = parse(relatedValue, 'dd-MM-yyyy', new Date());

          return formattedDate1.valueOf() > formattedDate2.valueOf();
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;

          return `Дата ${args.property} должна быть больше чем ${relatedPropertyName}`;
        },
      },
    });
  };
}
