import { choose, distinctByKey, flatMap } from '../common/arrays';
import { bounce, insteadNonNullable } from '../common/core';
import { forEach, fromArray, isEmpty } from '../common/record';
import { toRelativePath } from '../shared/filename';
import { NameBuilder } from '../shared/name-builder';
import { getReferences } from '../shared/reference';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { DeclarationInfo } from './declaration-info';

export class FileInfo implements Writable {
    public readonly kind = 'file';

    public constructor(
        public fileName: string,
        public declarations: DeclarationInfo[],
    ) { }

    private getReferenceMap(): Record<string, NameBuilder[]> {
        return fromArray(
            distinctByKey(
                choose(
                    flatMap(this.declarations, declaration => getReferences(declaration)),
                    reference => insteadNonNullable(
                        reference.fullName,
                        name => this.fileName !== name.getFileName() ? name : null,
                    ),
                ),
                name => name.build(),
            ),
            name => name.getFileName(),
            name => [name],
            (oldValue, newValue) => oldValue.concat(newValue),
        );
    }

    private writeImports(writer: TextWriter): void {
        const referenceMap = this.getReferenceMap();
        const hasServices = this.declarations.some(e => e.kind === 'service');

        if (isEmpty(referenceMap) && !hasServices) return;

        if (hasServices) {
            writer.writeLine(`import { HttpClient } from '@angular/common/http';`);
            writer.writeLine(`import { Injectable } from '@angular/core';`);
        }

        forEach(referenceMap, (names, fileName) => {
            const relativePath = toRelativePath(this.fileName, fileName);

            writer.write('import { ');

            distinctByKey(names.map(name => name.getRootTypeName()), bounce).sort().forEach((type, index) => {
                if (index > 0) {
                    writer.write(', ');
                }
                writer.write(type);
            });

            writer.writeLine(` } from '${relativePath}';`);
        });

        writer.writeLine();
    }

    public write(writer: TextWriter): void {
        writer.writeLine(`// file: ${this.fileName}.proto`);
        writer.writeLines([
            '// STOP! THIS FILE WAS AUTO-GENERATED',
            '// ANY CHANGES MADE TO THIS FILE WILL BE LOST!',
            '// THE CHANGES CAN ONLY BE MADE IN THE ORIGINAL PROTO FILE',
        ]);
        writer.writeLine();

        this.writeImports(writer);

        this.declarations.forEach(declaration => {
            declaration.write(writer);
        });
    }
}
