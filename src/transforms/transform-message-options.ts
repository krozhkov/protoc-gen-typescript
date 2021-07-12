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
                return this.transformMessage(declaration, options);
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
        options: Options,
    ): MessageInfo {
        switch (options.swagger_options) {
            case 'set_required':
                return this.processRequiredOption(message, options);
            default:
                return message;
        }
    }

    private processRequiredOption(message: MessageInfo, options: Options): typeof message {
        if (isNullable(message.options) || message.options.required.length === 0) return message;

        const requiredList = message.options.required;

        message.fields = map(message.fields, field => this.setNonRequiredFieldAsOptional(field, requiredList, options));

        return message;
    }

    private setNonRequiredFieldAsOptional(field: FieldInfo, requiredList: string[], options: Options): FieldInfo {
        const isRequired = requiredList.indexOf(field.name) !== -1;

        return !isRequired
            ? options.optional === 'as_nullable'
                ? this.makeFieldNullable(field)
                : this.makeFieldOptional(field)
            : field;
    }

    private makeFieldNullable(field: FieldInfo): FieldInfo {
        return field.type.kind !== 'nullable'
            ? atop(field, { type: new NullableInfo(field.type) })
            : field;
    }

    private makeFieldOptional(field: FieldInfo): FieldInfo {
        return atop(field, { isOptional: true });
    }
}
