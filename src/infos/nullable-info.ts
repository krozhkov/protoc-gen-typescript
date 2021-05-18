import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { TypeInfo } from './type-info';

export class NullableInfo implements Writable {
    public readonly kind = 'nullable';

    public constructor(
        public type: TypeInfo,
    ) { }

    write(writer: TextWriter): void {
        this.type.write(writer);
        writer.write(' | undefined');
    }
}
