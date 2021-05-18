import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { TypeInfo } from './type-info';

export class RepeatedInfo implements Writable {
    public readonly kind = 'repeated';

    public constructor(
        public type: TypeInfo,
    ) { }

    write(writer: TextWriter): void {
        writer.write('Array<')
        this.type.write(writer);
        writer.write('>');
    }
}
