import { dumpComments } from '../shared/dumping';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { TypeInfo } from './type-info';

export class FieldInfo implements Writable {
    public readonly kind = 'field';

    public constructor(
        public name: string,
        public comments: string[] | undefined,
        public type: TypeInfo,
        public isOptional: boolean,
        public oneOf: string | undefined,
    ) { }

    write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.write(this.name);

        if (this.isOptional) {
            writer.write('?: ');
        } else {
            writer.write(': ');
        }

        this.type.write(writer);

        writer.writeLine(';');
    }
}
