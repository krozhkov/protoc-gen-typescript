import { bounce } from './core';

export function toRecordOf<K extends keyof any, T>(): Record<K, T> {
    return Object.create(null) as Record<K, T>;
}

export function atOr<K extends keyof any, T, O>(
    record: Record<K, T>,
    key: K,
    or: O,
): T | O {
    return withAt(record, key, bounce, () => or);
}

export function withAt<K extends keyof any, T, R, O>(
    record: Record<K, T>,
    key: K,
    haveAt: (value: T, record: Record<K, T>) => R,
    haveNone: (record: Record<K, T>) => O,
): R | O {
    if (key in record) {
        return haveAt(record[key], record);
    } else {
        return haveNone(record);
    }
}

export function rewrite<K extends keyof any, T>(
    record: Record<K, T>,
    key: K,
    value: T,
): Record<K, T> {
    record[key] = value;
    return record;
}

export function addByMerge<K extends keyof any, T>(
    record: Record<K, T>,
    key: K,
    value: T,
    merge: (existing: T, adding: T) => T,
): Record<K, T> {
    return withAt(
        record, key,
        (existing, record) => rewrite(record, key, merge(existing, value)),
        record => rewrite(record, key, value),
    );
}

export function fromArray<K extends keyof any, T, A>(
    values: A[],
    toKey: (value: A) => K,
    toValue: (value: A) => T,
    merge: (oldValue: T, newValue: T) => T,
): Record<K, T> {
    return values.reduce(
        (record, value) => addByMerge(record, toKey(value), toValue(value), merge),
        toRecordOf<K, T>(),
    );
}

export function forEach<K extends keyof any, T>(
    record: Record<K, T>,
    use: (value: T, key: K) => void,
): void {
    const keys = Object.keys(record).sort() as K[];
    for (let key of keys) {
        use(record[key], key);
    }
}

export function isEmpty<K extends keyof any, T>(
    record: Record<K, T>,
): boolean {
    return Object.keys(record).length === 0;
}
