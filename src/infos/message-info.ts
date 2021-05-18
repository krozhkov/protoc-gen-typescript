import { dumpComments, dumpNestedDeclarations } from '../shared/dumping';
import { NameBuilder } from '../shared/name-builder';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { DeclarationInfo } from './declaration-info';
import { FieldInfo } from './field-info';

export class MessageInfo implements Writable {
    public readonly kind = 'message';

    public constructor(
        public name: string,
        public fullname: NameBuilder,
        public comments: string[] | undefined,
        public fields: FieldInfo[],
        public nested: DeclarationInfo[],
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.writeLine(`export interface ${this.name} {`);
        writer.indent();

        this.fields.forEach(field => {
            field.write(writer);
        });

        writer.unindent();
        writer.writeLine('}');
        writer.writeLine();

        dumpNestedDeclarations(writer, this.name, this.nested);
    }
}
