import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';

export class ScalarInfo implements Writable {
    public readonly kind = 'scalar';

    public constructor(
        public name: string,
        public isStringLiteral = false,
    ) { }

    write(writer: TextWriter): void {
        if (this.isStringLiteral) {
            writer.write(`'${this.name}'`);
        } else {
            writer.write(this.name);
        }
    }
}
