
export class NameBuilder {
    public constructor(
        private fileName: string,
        private names: string[],
    ) { }

    public add(name: string) {
        return new NameBuilder(this.fileName, this.names.concat(name));
    }

    public getFileName(): string {
        return this.fileName;
    }

    public getRootTypeName(): string {
        return this.names.length > 1
            ? this.names[1]
            : '';
    }

    public getReference(): string {
        return this.names.slice(1).join('.');
    }

    public build(): string {
        return '.' + this.names.join('.');
    }
}

export function toName(file: string): NameBuilder {
    return new NameBuilder(file, []);
}
