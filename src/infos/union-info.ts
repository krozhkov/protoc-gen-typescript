import { dumpComments, dumpNestedDeclarations } from '../shared/dumping';
import { NameBuilder } from '../shared/name-builder';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { DeclarationInfo } from './declaration-info';
import { ReferenceInfo } from './reference-info';
import { ScalarInfo } from './scalar-info';

export class UnionInfo implements Writable {
    public readonly kind = 'union';

    public constructor(
        public name: string,
        public fullname: NameBuilder,
        public comments: string[] | undefined,
        public values: UnionValueInfo[],
        public nested: DeclarationInfo[],
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.writeLine(`export type ${this.name} =`);
        writer.indent();

        this.values.forEach(value => {
            value.write(writer);
        });

        writer.writeLine(';');
        writer.unindent();
        writer.writeLine();

        dumpNestedDeclarations(writer, this.name, this.nested);
    }
}

export class UnionValueInfo implements Writable {
    public readonly kind = 'union-value';

    public constructor(
        public type: ReferenceInfo | ScalarInfo,
        public comments: string[] | undefined = undefined,
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.write('| ');
        this.type.write(writer);
        writer.writeLine();
    }
}
