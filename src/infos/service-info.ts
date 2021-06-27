import { dumpComments } from '../shared/dumping';
import { NameBuilder } from '../shared/name-builder';
import { TextWriter } from '../shared/text-writer';
import { Writable } from '../shared/writable';
import { MethodInfo } from './method-info';

export class ServiceInfo implements Writable {
    public readonly kind = 'service';

    public constructor(
        public name: string,
        public fullname: NameBuilder,
        public methods: MethodInfo[],
        public comments: string[] | undefined,
    ) { }

    public write(writer: TextWriter): void {
        dumpComments(writer, this.comments);

        writer.writeLine(`@Injectable({`);
        writer.indent();
        writer.writeLine(`providedIn: 'root',`);
        writer.unindent();
        writer.writeLine(`})`);
        writer.writeLine(`export class ${this.name} {`);
        writer.indent();
        writer.writeLine(`constructor(`);
        writer.indent();
        writer.writeLine(`private readonly http: HttpClient,`);
        writer.unindent();
        writer.writeLine(`) { }`);
        writer.writeLine();

        this.methods.forEach(method => {
            method.write(writer);
        });

        writer.unindent();
        writer.writeLine('}');
        writer.writeLine();
    }
}
