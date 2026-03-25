import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function Match(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'match',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedProperty] = args.constraints;
                    return value === (args.object as any)[relatedProperty];
                },
            },
        });
    };
}