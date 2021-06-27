import { isNonNullable } from '../common/core';
import { dumpComments } from '../shared/dumping';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { ReferenceInfo } from './reference-info';

export class MethodInfo implements Writable {
    public readonly kind = 'method';

    public constructor(
        public name: string,
        public inputType: ReferenceInfo | undefined,
        public outputType: ReferenceInfo | undefined,
        public comments: string[] | undefined,
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);
        writer.write(`public ${this.name}(`);

        if (isNonNullable(this.inputType)) {
            writer.write(`value: `);
            this.inputType.write(writer);
        }

        writer.write(`): `);

        // TODO: can be Observable instead of Promise
        writer.write(`Promise<`)
        if (isNonNullable(this.outputType)) {
            this.outputType.write(writer);
        } else {
            writer.write(`void`);
        }
        writer.write(`>`)

        writer.writeLine(` {`);

        // TODO: print method body

        writer.writeLine(`}`);
    }
}
