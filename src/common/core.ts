
export type LikeNullable<T> = [null] extends [T] ? unknown : [undefined] extends [T] ? unknown : never;

export function crash(...messages: string[]): never {
    throw new Error(messages.join(' '));
}

export function broke(_: never): never {
    return crash('Unexpected execution path.');
}

export function bounce<T>(value: T): T {
    return value;
}

export function isNonNullable<T extends LikeNullable<T>>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function isNullable<T>(value: T | null | undefined): value is null | undefined {
    return value === null || value === undefined;
}

export function asNonNullableOrDie<T extends LikeNullable<T>>(value: T, message: string): NonNullable<T> {
    return isNonNullable(value) ? value : crash(message);
}

export function asNonNullableOr<T extends LikeNullable<T>, O>(value: T, or: O): NonNullable<T> | O {
    return isNonNullable(value) ? value : or;
}

export function insteadNonNullableOr<T extends LikeNullable<T>, R, O>(
    value: T,
    instead: (value: NonNullable<T>) => R,
    or: O,
): R | O {
    return isNonNullable(value) ? instead(value) : or;
}

export function insteadNonNullable<T extends LikeNullable<T>, R>(
    value: T,
    instead: (value: NonNullable<T>) => R,
): R | undefined {
    return isNonNullable(value) ? instead(value) : undefined;
}

export function atop<T>(target: T, partial: Partial<T>): T {
    return Object.assign(target, partial);
}

export function alwaysTrue(): true {
    return true;
}

export function alwaysFalse(): false {
    return false;
}
