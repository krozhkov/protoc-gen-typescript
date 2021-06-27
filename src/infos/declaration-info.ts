import { EnumInfo } from './enum-info';
import { MessageInfo } from './message-info';
import { ServiceInfo } from './service-info';
import { UnionInfo } from './union-info';

export type DeclarationInfo =
    | MessageInfo
    | EnumInfo
    | UnionInfo
    | ServiceInfo
    ;
