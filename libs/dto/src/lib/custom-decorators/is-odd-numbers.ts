import { registerDecorator, ValidationOptions } from 'class-validator'


export function IsOddNumber(validationOptions?: ValidationOptions) {
    return function (object: NonNullable<unknown>, propertyName: string) {
        registerDecorator({
            name: 'isOddNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return typeof value === 'number' && value % 2 !== 0
                },
            },
        });
    };
}