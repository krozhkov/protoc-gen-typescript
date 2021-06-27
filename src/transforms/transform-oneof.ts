import { choose, distinctByKey, map, toSingleOr } from '../common/arrays';
import { atop, bounce, broke, isNonNullable, isNullable } from '../common/core';
import { capitalize } from '../common/text';
import { DeclarationInfo } from '../infos/declaration-info';
import { FieldInfo } from '../infos/field-info';
import { MessageInfo } from '../infos/message-info';
import { ReferenceInfo } from '../infos/reference-info';
import { UnionInfo, UnionValueInfo } from '../infos/union-info';
import { NameBuilder } from '../shared/name-builder';
import { Options } from '../shared/options';
import { DeclarationTransformNode } from './transform-node';

export class TransformOneOf implements DeclarationTransformNode {
    public readonly kind = 'transform-declaration';

    public transform(declaration: DeclarationInfo, options: Options): DeclarationInfo {
        switch (declaration.kind) {
            case 'service':
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

    private transformNamed(named: MessageInfo): MessageInfo | UnionInfo {
        const sigleOneOfGroup = this.toSingleOneOfGroup(named);

        if (isNullable(sigleOneOfGroup)) return named;

        const shared = named.fields.filter(field => isNullable(field.oneOf));
        const oneOfs = named.fields.filter(field => isNonNullable(field.oneOf));

        const unionOfs = oneOfs.map(oneOf => this.createNamed(
            named.fullname,
            sigleOneOfGroup,
            oneOf,
            shared,
        ));

        return new UnionInfo(
            named.name,
            named.fullname,
            named.comments,
            unionOfs.map(item => new UnionValueInfo(new ReferenceInfo(item.fullname.build()))),
            named.nested.concat(unionOfs),
        );
    }

    private createNamed(
        originalName: NameBuilder,
        oneOfGroup: string,
        oneOf: FieldInfo,
        fields: FieldInfo[],
    ): MessageInfo {
        const name = capitalize(oneOfGroup) + capitalize(oneOf.name);
        return new MessageInfo(
            name,
            originalName.add(name),
            [],
            fields.concat(this.toRequiredOneOfField(oneOf)),
            [],
            undefined,
        );
    }

    private toRequiredOneOfField(
        field: FieldInfo,
    ): FieldInfo {
        return atop(field, {
            oneOf: undefined,
            isOptional: false,
            type: field.type.kind === 'nullable'
                ? field.type.type
                : field.type,
        });
    }

    private toSingleOneOfGroup(named: MessageInfo): string | undefined {
        const groups = distinctByKey(choose(named.fields, field => field.oneOf), bounce);

        return toSingleOr(groups, undefined);
    }
}
