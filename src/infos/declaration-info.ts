import { EnumInfo } from './enum-info';
import { MessageInfo } from './message-info';
import { UnionInfo } from './union-info';

export type DeclarationInfo =
    | MessageInfo
    | EnumInfo
    | UnionInfo
    ;
