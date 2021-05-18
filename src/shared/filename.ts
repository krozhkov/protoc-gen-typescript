import { choose, dareFirst, prepend, toArrayOf, valueAt, withLast } from '../common/arrays';
import { bounce } from '../common/core';
import { alwaysEmptyString, joinStrings, withClippedTail } from '../common/text';

export function baseFileName(
    fileName: string,
): string {
    return withLast(
        fileName.split('/'),
        bounce,
        alwaysEmptyString,
    );
}

export function changeExtension(
    fileName: string,
    oldExtension: string,
    newExtension: string,
): string {
    return withClippedTail(
        fileName,
        oldExtension,
        clipped => joinStrings('', clipped, newExtension),
        bounce,
    );
}

export function toBasePath(...paths: string[]): string {
    const splitted = paths.map(path => path.split('/'));

    const result = toArrayOf<string>();
    const maxLength = Math.max(...splitted.map(e => e.length));

    for (let i = 0; i < maxLength; i++) {
        const parts = choose(splitted, e => valueAt(e, i));

        if (parts.length < splitted.length) {
            break;
        }

        const first = dareFirst(parts);

        if (parts.some(value => value !== first)) {
            break;
        }

        result.push(first);
    }

    return result.length > 0
        ? result.join('/') + '/'
        : '';
}

export function toRelativePath(
    from: string,
    to: string,
): string {
    const basePath = toBasePath(from, to);

    const fromParts = from.replace(basePath, '').split('/');
    const toParts = to.replace(basePath, '').split('/');

    if (fromParts.length < 2) {
        return prepend(toParts, '.').join('/');
    } else {
        const count = fromParts.length - 1;
        return prepend(toParts, '..'.repeat(count)).join('/');
    }
}
