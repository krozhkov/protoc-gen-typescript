import { atop, crash, isNullable } from './common/core';
import { Options } from './shared/options';

const defaultOptions: Options = {
    paths: undefined,
    enums: undefined,
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
        default:
            return crash(`Unknown options key: ${key}`);
    }
}
