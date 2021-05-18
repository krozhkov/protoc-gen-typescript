import { DeclarationInfo } from '../infos/declaration-info';
import { FieldInfo } from '../infos/field-info';
import { FileInfo } from '../infos/file-info';
import { Options } from '../shared/options';

export type TransformNode =
    | FullTransformNode
    | FileTransformNode
    | DeclarationTransformNode
    | FieldTransformNode
    ;

export interface FullTransformNode {
    kind: 'transform-full';
    transform: (full: FileInfo[], options: Options) => FileInfo[];
}

export interface FileTransformNode {
    kind: 'transform-file';
    transform: (file: FileInfo, options: Options) => FileInfo;
}

export interface DeclarationTransformNode {
    kind: 'transform-declaration';
    transform: (declaration: DeclarationInfo, options: Options) => DeclarationInfo;
}

export interface FieldTransformNode {
    kind: 'transform-field';
    transform: (field: FieldInfo, options: Options) => FieldInfo;
}
