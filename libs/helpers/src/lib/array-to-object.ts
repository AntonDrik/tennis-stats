import * as A from 'fp-ts/ReadonlyArray'
import * as Re from 'fp-ts/ReadonlyRecord'
import {pipe} from 'fp-ts/function'

function isFunction<T, R>(value: ((v: T) => R) | R): value is ((v: T) => R) {
    return typeof value === 'function'
}

export function arrayToObject<T, R>(
    array: T[] = [],
    keyGetter: (v: T) => string,
    valueGetter: ((v: T) => R) | R
): Record<string, R> {
    
    return pipe(
        array,
        A.reduce(
            {},
            (acc, item) => pipe(
                acc,
                Re.upsertAt(
                    keyGetter(item),
                    isFunction(valueGetter) ? valueGetter(item) : valueGetter
                ))
        ),
    )
    
}