import { atop, crash, isNullable } from './common/core';
import { Options } from './shared/options';

const defaultOptions: Options = {
    paths: undefined,
    enums: undefined,
    swagger_options: undefined,
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
        default:
            return crash(`Unknown options key: ${key}`);
    }
}
