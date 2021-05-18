import { flatMap } from '../common/arrays';
import { bounce, broke, crash } from '../common/core';
import { fromArray, withAt } from '../common/record';
import { DeclarationInfo } from '../infos/declaration-info';
import { FileInfo } from '../infos/file-info';
import { NameBuilder } from '../shared/name-builder';
import { Options } from '../shared/options';
import { getReferences } from '../shared/reference';
import { FullTransformNode } from './transform-node';

export class ResolveReferences implements FullTransformNode {
    public readonly kind = 'transform-full';

    public transform(full: FileInfo[], _options: Options): FileInfo[] {
        const fullNameMap = toFullNameMap(full);

        return full.map(file => updateReferences(file, fullNameMap));
    }
}

function updateReferences(file: FileInfo, fullNameMap: Record<string, NameBuilder>): FileInfo {
    const references = flatMap(file.declarations, getReferences);

    references.forEach(reference => {
        const fullname = withAt(
            fullNameMap, reference.typeName, bounce,
            () => crash(`Unable to find the referenced type ${reference.typeName}.`),
        );

        reference.resolve(fullname);
    });

    return file;
}

function toFullNameMap(files: FileInfo[]): Record<string, NameBuilder> {
    return fromArray(
        flatMap(files, file => flatMap(file.declarations, fullnameOutOf)),
        name => name.build(),
        bounce,
        (_, newValue) => newValue,
    );
}

function fullnameOutOf(declaration: DeclarationInfo): NameBuilder[] {
    switch (declaration.kind) {
        case 'union':
        case 'message': return flatMap(declaration.nested, fullnameOutOf)
            .concat(declaration.fullname);
        case 'enum': return [declaration.fullname];
        default: return broke(declaration);
    }
}
