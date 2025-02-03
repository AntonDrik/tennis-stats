import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator'


/**
 * Выполняет проверку наличия связанного поля в объекте валидации
 */
export function IsTogetherOnly<T>(
    property: keyof T,
    validationOptions?: ValidationOptions,
) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isTogetherOnly',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: unknown, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints
                    return relatedPropertyName in args.object
                },
                
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints
                    return `${relatedPropertyName} и ${args.property} должны использоваться вместе`
                },
            },
        })
    }
}