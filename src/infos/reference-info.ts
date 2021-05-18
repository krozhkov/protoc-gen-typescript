import { crash, isNullable } from '../common/core';
import { NameBuilder } from '../shared/name-builder';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';

export class ReferenceInfo implements Writable {
    public readonly kind = 'reference';

    public constructor(
        public typeName: string,
        public fullName: NameBuilder | null = null,
    ) { }

    public resolve(fullName: NameBuilder): void {
        this.fullName = fullName;
    }

    write(writer: TextWriter): void {
        if (isNullable(this.fullName)) {
            return crash(`Unable to write unresolved reference type ${this.typeName}`);
        }

        writer.write(this.fullName.getReference());
    }
}
