import { withHeadOrOtherwise } from './arrays';
import { isNonNullable, isNullable } from './core';

export function alwaysEmptyString(): string {
    return '';
}

export function isEmpty(value: string): boolean {
    return value === '';
}

export function isNonNullableOrEmpty(value: string | null | undefined): value is string {
    return isNonNullable(value) && !isEmpty(value);
}

export function isNullableOrEmpty(value: string | null | undefined): boolean {
    return isNullable(value) || isEmpty(value);
}

export function joinStrings(separator: string, ...values: string[]): string {
    return values.join(separator);
}

export function capitalize<T extends string>(value: T): Capitalize<T> {
    return value.charAt(0).toUpperCase() + value.slice(1) as Capitalize<T>;
}

export function uncapitalize<T extends string>(value: T): Uncapitalize<T> {
    return value.substr(0, 1).toLowerCase() + value.substr(1) as Uncapitalize<T>;
}

export function snakeCaseToCamel(value: string): string {
    return withHeadOrOtherwise(
        value.toLowerCase().split(/[-_]/),
        (head, rest) => joinStrings('', head, ...rest.map(capitalize)),
        '',
    );
}

export function withClippedTail<R>(
    value: string,
    sample: string,
    haveClipped: (clipped: string, tail: string) => R,
    haveNone: (original: string) => R,
): R {
    return value.endsWith(sample)
        ? haveClipped(value.substr(0, value.length - sample.length), sample)
        : haveNone(value);
}
