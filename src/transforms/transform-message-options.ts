import { map } from '../common/arrays';
import { atop, broke, isNullable } from '../common/core';
import { DeclarationInfo } from '../infos/declaration-info';
import { FieldInfo } from '../infos/field-info';
import { MessageInfo } from '../infos/message-info';
import { NullableInfo } from '../infos/nullable-info';
import { Options } from '../shared/options';
import { DeclarationTransformNode } from './transform-node';

export class TransformMessageOptions implements DeclarationTransformNode {
    public readonly kind = 'transform-declaration';

    public transform(declaration: DeclarationInfo, options: Options): DeclarationInfo {
        if (isNullable(options.swagger_options)) return declaration;

        switch (declaration.kind) {
            case 'message':
                return this.transformMessage(declaration, options.swagger_options);
            case 'union':
            case 'enum':
            case 'service':
                return declaration;
            default:
                return broke(declaration);
        }
    }

    private transformMessage(
        message: MessageInfo,
        config: NonNullable<Options['swagger_options']>,
    ): MessageInfo {
        switch (config) {
            case 'set_required':
                return this.processRequiredOption(message);
            default:
                return message;
        }
    }

    private processRequiredOption(message: MessageInfo): typeof message {
        if (isNullable(message.options) || message.options.required.length === 0) return message;

        const requiredList = message.options.required;

        message.fields = map(message.fields, field => this.setNonRequiredFieldAsNullable(field, requiredList));

        return message;
    }

    private setNonRequiredFieldAsNullable(field: FieldInfo, requiredList: string[]): FieldInfo {
        const isRequired = requiredList.indexOf(field.name) !== -1;

        return !isRequired && field.type.kind !== 'nullable'
            ? atop(field, { type: new NullableInfo(field.type) })
            : field;
    }
}
