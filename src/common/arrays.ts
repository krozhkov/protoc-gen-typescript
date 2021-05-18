import { bounce, crash } from './core';

export interface LikeArray<T> extends ArrayLike<T> {
    slice(start?: number, end?: number): this;
};

export const becauseArrayIsEmpty = 'Because the array is empty.';

export function toArrayOf<T>(): T[] {
    return [];
}

export function of2<A, B>(a: A, b: B): [A, B] {
    return [a, b];
}

export function valueAt<T>(values: T[], index: number): T | undefined {
    return values[index];
}

export function map<T, R>(values: T[], map: (value: T, index: number) => R): R[] {
    return values.map(map);
}

export function flatMap<T, R>(values: T[], map: (value: T, index: number) => R[]): R[] {
    return values.flatMap(map);
}

export function choose<T, R>(values: T[], map: (value: T) => R | null | undefined): R[] {
    return filter(values.map(map), (value): value is R => value !== null && value !== undefined);
}

export function filter<T, R extends T>(values: T[], predicate: (value: T) => value is R): R[] {
    return values.filter(predicate);
}

export function prepend<T>(values: T[], ...added: T[]): T[] {
    values.unshift(...added);
    return values;
}

export function withHeadOrOtherwise<T, R, O>(
    values: T[],
    haveHead: (head: T, rest: T[]) => R,
    otherwise: O,
): R | O {
    return values.length > 0
        ? haveHead(values[0], values.slice(1))
        : otherwise;
}

export function withFirst<T, R>(
    values: T[],
    haveFirst: (value: T) => R,
    haveNone: (reason: string) => R,
): R {
    return values.length > 0
        ? haveFirst(values[0])
        : haveNone(becauseArrayIsEmpty);
}

export function withLast<T, R>(
    values: T[],
    haveLast: (value: T) => R,
    haveNone: (reason: string) => R,
): R {
    return values.length > 0
        ? haveLast(values[values.length - 1])
        : haveNone(becauseArrayIsEmpty);
}

export function addRange<T>(
    values: T[],
    added: T[],
): T[] {
    values.push(...added);
    return values;
}

export function dareFirst<T>(values: T[]): T {
    return withFirst(
        values,
        bounce,
        reason => crash('Unable to find the first value.', reason),
    );
}

export function distinctByKey<T>(
    values: T[],
    toKey: (value: T) => string,
): T[] {
    const keys = toArrayOf<string>();
    const result = toArrayOf<T>();

    values.forEach(value => {
        const key = toKey(value);

        if (keys.includes(key)) return;

        keys.push(key);
        result.push(value);
    });

    return result;
}

export function toSingleOr<T, O>(
    values: T[],
    or: O,
): T | O {
    return values.length === 1
        ? values[0]
        : or;
}

export function fromRange(min: number, max: number): Array<number> {
    return Array.from(range(min, max), bounce);
}

export function* range(min: number, max: number): IterableIterator<number> {
    while (min <= max) {
        yield min++;
    }
}

export function splitIntoChunks<T, A extends LikeArray<T>>(data: A, chunkSize: number): A[] {
    const chunksCount = Math.ceil(data.length / chunkSize);

    return fromRange(0, chunksCount - 1)
        .map(i => data.slice(i * chunkSize, i * chunkSize + chunkSize));
}
