import { choose, flatMap } from '../common/arrays';
import { broke } from '../common/core';
import { DeclarationInfo } from '../infos/declaration-info';
import { ReferenceInfo } from '../infos/reference-info';
import { TypeInfo } from '../infos/type-info';

export function getReferences(declaration: DeclarationInfo): ReferenceInfo[] {
    switch (declaration.kind) {
        case 'message': {
            const nested = flatMap(declaration.nested, getReferences);
            return nested.concat(choose(
                declaration.fields,
                field => getReference(field.type),
            ));
        }
        case 'union': {
            const nested = flatMap(declaration.nested, getReferences);
            return nested.concat(choose(
                declaration.values,
                value => getReference(value.type),
            ));
        }
        case 'enum': return [];
        default: return broke(declaration);
    }
}

function getReference(type: TypeInfo): ReferenceInfo | null {
    switch (type.kind) {
        case 'scalar':
            return null;
        case 'reference':
            return type;
        case 'nullable':
        case 'repeated':
            return getReference(type.type);
        default:
            return broke(type);
    }
}
