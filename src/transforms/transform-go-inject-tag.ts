import { choose, map, of2 } from '../common/arrays';
import { alwaysFalse, alwaysTrue, atop, bounce, insteadNonNullable, insteadNonNullableOr, isNullable } from '../common/core';
import { atOr, fromArray, toRecordOf, withAt } from '../common/record';
import { FieldInfo } from '../infos/field-info';
import { NullableInfo } from '../infos/nullable-info';
import { ScalarInfo } from '../infos/scalar-info';
import { chainable } from '../shared/chainable';
import { Options } from '../shared/options';
import { TextWriter } from '../shared/text-writer';
import { FieldTransformNode } from './transform-node';

// Sample of comment string
// @inject_tag: validate:"required,max=80"
// @inject_tag: validate:"omitempty,uuid4"
// @inject_tag: custom_tag:"custom_value"
// @inject_tag: validate:"required,oneof=CHECKING SAVINGS"

export class TransformGoInjectTag implements FieldTransformNode {
    public readonly kind = 'transform-field';

    public transform(field: FieldInfo, _options: Options): FieldInfo {
        const tags = extractInjectTag(field.comments);

        const validate = insteadNonNullableOr(
            insteadNonNullable(tags, tags => atOr(tags, 'validate', undefined)),
            validate => parseValidationTag(validate),
            toRecordOf<string, string | true>(),
        );

        return chainable(field)
            .chain(value => this.setOptional(value, validate))
            .chain(value => this.setOneOfTagTypes(value, validate))
            .get();
    }

    private setOptional(field: FieldInfo, validate: Record<string, string | true>): FieldInfo {
        const required = withAt(validate, 'required', alwaysTrue, alwaysFalse);
        const omitempty = withAt(validate, 'omitempty', alwaysTrue, alwaysFalse);
        const isdefault = withAt(validate, 'isdefault', alwaysTrue, alwaysFalse);

        // KR: stay as is if no attribute is specified.
        if (!required && !omitempty && !isdefault) return field;

        return (omitempty || isdefault || !required) && field.type.kind !== 'nullable'
            ? atop(field, { type: new NullableInfo(field.type) })
            : field;
    }

    private setOneOfTagTypes(field: FieldInfo, validate: Record<string, string | true>): FieldInfo {
        const oneOf = withAt(
            validate, 'oneof',
            value => typeof value === 'string'
                ? value.split(/\s+/).map(item => item.trim())
                : undefined,
            () => undefined,
        );

        if (isNullable(oneOf)) return field;

        return field.type.kind === 'scalar'
            ? atop(field, { type: new StringLiteralsUnionInfo(oneOf) })
            : field;
    }
}

function extractInjectTag(
    comments: string[] | undefined,
): Record<string, string> | undefined {
    if (isNullable(comments)) return undefined;

    comments = comments.filter(line => line.includes('@inject_tag:'));

    if (comments.length === 0) return undefined;

    return fromArray(
        choose(comments, comment => insteadNonNullable(
            comment.match(/@inject_tag:\s*(?<tag>[\w_0-9]+):\s*"(?<value>[^"]+)"/),
            match => insteadNonNullable(match.groups, groups => of2(groups.tag, groups.value)),
        )),
        ([tag]) => tag,
        ([_, value]) => value,
        bounce,
    );
}

function parseValidationTag(
    validate: string,
): Record<string, string | true> {
    return fromArray(
        map(validate.split(','), part => {
            const pair = part.trim().split('=');
            return of2<string, string | true>(pair[0], pair[1] ?? true);
        }),
        ([rule]) => rule,
        ([_, value]) => value,
        bounce,
    );
}

class StringLiteralsUnionInfo extends ScalarInfo {
    public constructor(
        public literals: string[],
    ) {
        super('', true);
    }

    write(writer: TextWriter): void {
        writer.write(this.literals.map(literal => `'${literal}'`).join(' | '));
    }
}
