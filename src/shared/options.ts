
export interface Options {
    readonly paths: 'omit_base' | undefined;
    readonly enums: 'to_string_union' | undefined;
    readonly optional: 'as_nullable' | undefined;
    readonly swagger_options: 'set_required' | undefined;
    readonly sprefix: Record<string, string> | undefined;
}
