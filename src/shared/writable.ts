import { TextWriter } from './text-writer';

export interface Writable {
    write(writer: TextWriter): void;
}
