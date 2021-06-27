import { map } from '../common/arrays';
import { atop, broke } from '../common/core';
import { DeclarationInfo } from '../infos/declaration-info';
import { FieldInfo } from '../infos/field-info';
import { FileInfo } from '../infos/file-info';
import { Options } from '../shared/options';
import { TransformNode } from './transform-node';

export class TransformPipe {

    private nodes: TransformNode[] = [];

    constructor(
        private options: Options,
    ) { }

    public pipe(node: TransformNode): TransformPipe {
        this.nodes.push(node);

        return this;
    }

    public transform(full: FileInfo[]): FileInfo[] {
        return this.nodes.reduce((full, node) => {
            switch (node.kind) {
                case 'transform-full':
                    return node.transform(full, this.options);
                case 'transform-file':
                    return applyTransformToFile(
                        full, file => node.transform(file, this.options),
                    );
                case 'transform-declaration':
                    return applyTransformToDeclaration(
                        full, declaration => node.transform(declaration, this.options),
                    );
                case 'transform-field':
                    return applyTransformToField(
                        full, field => node.transform(field, this.options),
                    );
                default:
                    return broke(node);
            }
        }, full);
    }
}

function applyTransformToFile(
    full: FileInfo[],
    transform: (file: FileInfo) => FileInfo,
): typeof full {
    return map(full, file => transform(file));
}

function applyTransformToDeclaration(
    full: FileInfo[],
    transform: (declaration: DeclarationInfo) => DeclarationInfo,
): typeof full {
    return applyTransformToFile(
        full, file => atop(file, {
            declarations: map(
                file.declarations,
                declaration => applyTransformToNestedDeclarations(declaration, transform),
            ),
        }),
    );
}

function applyTransformToNestedDeclarations(
    declaration: DeclarationInfo,
    transform: (declaration: DeclarationInfo) => DeclarationInfo,
): DeclarationInfo {
    switch (declaration.kind) {
        case 'service':
        case 'enum':
            return transform(declaration);
        case 'union':
        case 'message':
            return transform(
                atop(declaration, {
                    nested: map(
                        declaration.nested,
                        nested => applyTransformToNestedDeclarations(nested, transform),
                    ),
                }),
            );
        default:
            return broke(declaration);
    }
}

function applyTransformToField(
    full: FileInfo[],
    transform: (field: FieldInfo) => FieldInfo,
): typeof full {
    return applyTransformToDeclaration(
        full, declaration => applyTransformToFieldInDeclaration(declaration, transform),
    );
}

function applyTransformToFieldInDeclaration(
    declaration: DeclarationInfo,
    transform: (field: FieldInfo) => FieldInfo,
): typeof declaration {
    switch (declaration.kind) {
        case 'service':
        case 'union':
        case 'enum':
            return declaration;
        case 'message':
            return atop(declaration, {
                fields: map(
                    declaration.fields,
                    field => transform(field),
                ),
            });
        default:
            return broke(declaration);
    }
}
