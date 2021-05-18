import { broke, isNullable } from '../common/core';
import { DeclarationInfo } from '../infos/declaration-info';
import { EnumInfo } from '../infos/enum-info';
import { ScalarInfo } from '../infos/scalar-info';
import { UnionInfo, UnionValueInfo } from '../infos/union-info';
import { Options } from '../shared/options';
import { DeclarationTransformNode } from './transform-node';

export class TransformEnumToUnion implements DeclarationTransformNode {
    public readonly kind = 'transform-declaration';

    public transform(declaration: DeclarationInfo, options: Options): DeclarationInfo {
        if (isNullable(options.enums)) return declaration;

        switch (declaration.kind) {
            case 'enum':
                return this.transformEnum(declaration);
            case 'union':
            case 'message':
                return declaration;
            default:
                return broke(declaration);
        }
    }

    public transformEnum(enumInfo: EnumInfo): UnionInfo {
        const values = enumInfo.values.map(
            value => new UnionValueInfo(new ScalarInfo(value.name, true), value.comments),
        );

        return new UnionInfo(
            enumInfo.name,
            enumInfo.fullname,
            enumInfo.comments,
            values,
            [],
        );
    }
}
