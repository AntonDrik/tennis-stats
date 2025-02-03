import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsEqualTo<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)?.[relatedPropertyName];

          return relatedValue === value;
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${relatedPropertyName} и ${args.property} должны быть равны`;
        },
      },
    });
  };
}
