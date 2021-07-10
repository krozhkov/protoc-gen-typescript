import { isNonNullable, isNullable } from '../common/core';
import { uncapitalize } from '../common/text';
import { dumpComments } from '../shared/dumping';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { MethodOptions } from './options/method-options';
import { ReferenceInfo } from './reference-info';

export class MethodInfo implements Writable {
    public readonly kind = 'method';

    public constructor(
        public name: string,
        public inputType: ReferenceInfo | undefined,
        public outputType: ReferenceInfo | undefined,
        public options: MethodOptions | undefined,
        public comments: string[] | undefined,
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);
        writer.write(`public ${uncapitalize(this.name)}(`);

        if (isNonNullable(this.inputType)) {
            writer.write(`value: `);
            this.inputType.write(writer);
        }

        writer.write(`): `);

        // TODO: can be Observable instead of Promise
        writer.write(`Promise<`)
        this.writeOutputType(writer);
        writer.write(`>`)

        writer.writeLine(` {`);
        writer.indent();

        if (isNonNullable(this.options)) {
            const { httpMethod, url, body } = this.options;

            writer.writeLine(`return this.http`);
            writer.indent();
            writer.write(`.${httpMethod.toLowerCase()}<`);
            this.writeOutputType(writer);
            writer.write(`>(\`${fixUrlParameters(url)}\``);
            if (isNonNullable(body) || (httpMethod !== 'GET' && httpMethod !== 'DELETE')) {
                writer.write(`, ${isNonNullable(this.inputType) ? fixBodyParameter(body) : '{}'}`);
            }
            writer.writeLine(`)`)
            writer.writeLine(`.toPromise();`);
            writer.unindent();
        } else {
            // REST client does not support non-annotated methods.
            writer.writeLine(`throw new Error('Method is not implemented!');`);
        }

        writer.unindent();
        writer.writeLine(`}`);
        writer.writeLine();
    }

    private writeOutputType(writer: TextWriter): void {
        if (isNonNullable(this.outputType)) {
            this.outputType.write(writer);
        } else {
            writer.write(`void`);
        }
    }
}

function fixUrlParameters(url: string): string {
    return url.replace(/\{(.*?)\}/g, '$${value.$1}');
}

function fixBodyParameter(body: string | undefined): string {
    if (isNullable(body)) return '{}';

    return body === '*'
        ? 'value'
        : 'value.' + body;
}
