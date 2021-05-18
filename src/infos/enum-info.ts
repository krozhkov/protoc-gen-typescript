import { isNonNullable } from '../common/core';
import { dumpComments } from '../shared/dumping';
import { NameBuilder } from '../shared/name-builder';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';

export class EnumInfo implements Writable {
    public readonly kind = 'enum';

    public constructor(
        public name: string,
        public fullname: NameBuilder,
        public comments: string[] | undefined,
        public values: EnumValueInfo[],
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.writeLine(`export enum ${this.name} {`);
        writer.indent();

        this.values.forEach(value => {
            value.write(writer);
        });

        writer.unindent();
        writer.writeLine('}');
        writer.writeLine();
    }
}

export class EnumValueInfo implements Writable {
    public readonly kind = 'enum-value';

    public constructor(
        public name: string,
        public comments: string[] | undefined,
        public value: number | undefined,
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.write(this.name);

        if (isNonNullable(this.value)) {
            writer.write(' = ' + this.value);
        }

        writer.writeLine(',');
    }
}
