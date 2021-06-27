import { asNonNullableOr, atop, crash, isNullable } from './common/core';
import { addByMerge, toRecordOf } from './common/record';
import { Options } from './shared/options';

const defaultOptions: Options = {
    paths: undefined,
    enums: undefined,
    swagger_options: undefined,
    sprefix: undefined,
};

export function readOptions(params: string | undefined): Options {
    if (isNullable(params)) return defaultOptions;

    return params.split(',')
        .reduce((options, parameter) => {
            const pair = parameter.trim().split('=');
            return setOption(options, pair[0], pair[1]);
        }, defaultOptions);
}

function setOption(options: Options, key: string, value: string | undefined): Options {
    switch (key) {
        case 'paths': {
            const paths = value === 'omit_base' ? value : undefined;
            return atop(options, { paths });
        }
        case 'enums': {
            const enums = value === 'to_string_union' ? value : undefined;
            return atop(options, { enums });
        }
        case 'swagger_options': {
            const swagger_options = value === 'set_required' ? value : undefined;
            return atop(options, { swagger_options });
        }
        case 'sprefix': {
            if (isNullable(value) || value.indexOf('~') === -1) return options;

            const pair = value.split('~');

            const record = asNonNullableOr(options.sprefix, toRecordOf<string, string>());

            return atop(options, {
                sprefix: addByMerge(
                    record,
                    pair[0],
                    pair[1],
                    (_, adding) => adding,
                ),
            });
        }
        default:
            return crash(`Unknown options key: ${key}`);
    }
}
