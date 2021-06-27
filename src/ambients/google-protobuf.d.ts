import * as jspb from 'google-protobuf';

declare module 'google-protobuf' {
    interface Message {
        getExtension<T>(fieldInfo: jspb.ExtensionFieldInfo<T>): T | undefined;
    }
}

// FieldWithDefault
type FieldWithDefault<K extends string, T extends Primitive, Owner> =
    & GetFieldWithDefault<K, T>
    & SetFieldWithDefault<K, T, Owner>;

type Primitive = string | number | boolean;

type GetFieldWithDefault<K extends string, T extends Primitive> = {
    [P in `get${Capitalize<K>}`]: () => T;
};

type SetFieldWithDefault<K extends string, T extends Primitive, Owner> = {
    [P in `set${Capitalize<K>}`]: (value: T) => Owner;
};

// WrapperField
type WrapperField<K extends string, T, Owner> =
    & GetWrapperField<K, T>
    & SetWrapperField<K, T, Owner>
    & ClearWrapperField<K, Owner>
    & HasWrapperField<K>;

type GetWrapperField<K extends string, T> = {
    [P in `get${Capitalize<K>}`]: () => T | undefined;
};

type SetWrapperField<K extends string, T, Owner> = {
    [P in `set${Capitalize<K>}`]: (value: T | undefined) => Owner;
};

type ClearWrapperField<K extends string, Owner> = {
    [P in `clear${Capitalize<K>}`]: () => Owner;
};

type HasWrapperField<K extends string> = {
    [P in `has${Capitalize<K>}`]: () => boolean;
};

// RepeatedField
type RepeatedField<K extends string, T, Owner> =
    & GetRepeatedField<K, T>
    & SetRepeatedField<K, T, Owner>
    & AddRepeatedField<K, T, Owner>
    & ClearRepeatedField<K, Owner>;

type GetRepeatedField<K extends string, T> = {
    [P in `get${Capitalize<K>}List`]: () => T[];
};

type SetRepeatedField<K extends string, T, Owner> = {
    [P in `set${Capitalize<K>}List`]: (value: T[]) => Owner;
};

type AddRepeatedField<K extends string, T, Owner> = {
    [P in `add${Capitalize<K>}`]: (value: T, index: number) => Owner;
};

type ClearRepeatedField<K extends string, Owner> = {
    [P in `clear${Capitalize<K>}List`]: () => Owner;
};

// MapField
type MapField<K extends string, Key extends Primitive, T, Owner> =
    & GetMapField<K, Key, T>
    & ClearMapField<K, Owner>;

type GetMapField<K extends string, Key extends Primitive, T> = {
    [P in `get${Capitalize<K>}Map`]: (noLazyCreate?: boolean) => jspb.Map<Key, T>;
};

type ClearMapField<K extends string, Owner> = {
    [P in `clear${Capitalize<K>}Map`]: () => Owner;
};
