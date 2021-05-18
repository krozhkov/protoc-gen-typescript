import { map } from '../common/arrays';
import { atop, broke, isNullable } from '../common/core';
import { DeclarationInfo } from '../infos/declaration-info';
import { FieldInfo } from '../infos/field-info';
import { MessageInfo } from '../infos/message-info';
import { Options } from '../shared/options';
import { DeclarationTransformNode } from './transform-node';

export class TransformOneOfFallback implements DeclarationTransformNode {
    public readonly kind = 'transform-declaration';

    public transform(declaration: DeclarationInfo, options: Options): DeclarationInfo {
        switch (declaration.kind) {
            case 'enum':
                return declaration;
            case 'union':
                return atop(declaration, {
                    nested: map(declaration.nested, nested => this.transform(nested, options)),
                });
            case 'message':
                return this.transformNamed(atop(declaration, {
                    nested: map(declaration.nested, nested => this.transform(nested, options)),
                }));
            default:
                return broke(declaration);
        }
    }

    private transformNamed(named: MessageInfo): MessageInfo {
        return atop(named, {
            fields: named.fields.map(field => this.transformField(field)),
        });
    }

    private transformField(field: FieldInfo): FieldInfo {
        if (isNullable(field.oneOf)) return field;

        return atop(field, {
            isOptional: true,
            oneOf: undefined,
            type: field.type.kind === 'nullable'
                ? field.type.type
                : field.type,
        })
    }
}
