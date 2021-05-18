
export class TextWriter {

    private parts: string[] = [];

    private depth: number = 0;

    private shouldBeIndented = true;

    private readonly padding: string;

    public constructor(
        indentSize = 4,
        useSpaces = true,
    ) {
        this.padding = useSpaces
            ? ' '.repeat(indentSize)
            : '\t';
    }

    public writeLines(values: string[]): void {
        values.forEach(value => this.writeLine(value));
    }

    public writeLine(value: string = ''): void {
        this.write(value + '\n');
        this.shouldBeIndented = true;
    }

    public write(value: string): void {
        if (this.shouldBeIndented) {
            value = this.padding.repeat(this.depth) + value;
            this.shouldBeIndented = false;
        }

        this.parts.push(value);
    }

    public indent(): void {
        this.depth++;
    }

    public unindent(): void {
        if (this.depth > 0) {
            this.depth--;
        }
    }

    public dump(): string {
        return this.parts.join('');
    }
}
