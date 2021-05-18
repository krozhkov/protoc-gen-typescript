import { isNonNullable } from '../common/core';
import { DeclarationInfo } from '../infos/declaration-info';
import { TextWriter } from './text-writer';

export function dumpComments(
    writer: TextWriter,
    comments: string[] | undefined,
): void {
    if (isNonNullable(comments)) {
        comments.forEach(line => {
            writer.writeLine('//' + line);
        });
    }
}

export function dumpNestedDeclarations(
    writer: TextWriter,
    name: string,
    nested: DeclarationInfo[],
): void {
    if (nested.length === 0) return;

    writer.writeLine(`export namespace ${name} {`);
    writer.indent();

    nested.forEach(declaration => {
        declaration.write(writer);
    });

    writer.unindent();
    writer.writeLine('}');
    writer.writeLine();
}
