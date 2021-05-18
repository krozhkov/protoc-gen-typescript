import { NullableInfo } from './nullable-info';
import { ReferenceInfo } from './reference-info';
import { RepeatedInfo } from './repeated-info';
import { ScalarInfo } from './scalar-info';

export type TypeInfo =
    | ScalarInfo
    | ReferenceInfo
    | RepeatedInfo
    | NullableInfo
    ;
