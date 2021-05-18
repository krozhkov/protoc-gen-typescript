
export class PathBuilder {
    public constructor(
        protected path: number[],
    ) { }

    public build(): string {
        return this.path.join('.');
    }
}

export class FilePathBuilder extends PathBuilder {
    public message(index: number) {
        return new MessagePathBuilder(this.path.concat(4, index));
    }

    public enum(index: number) {
        return new EnumPathBuilder(this.path.concat(5, index));
    }

    public service(index: number) {
        return new ServicePathBuilder(this.path.concat(6, index));
    }

    public syntax() {
        return new PathBuilder(this.path.concat(12));
    }
}

export class MessagePathBuilder extends PathBuilder {
    public field(index: number) {
        return new PathBuilder(this.path.concat(2, index));
    }

    public nested(index: number) {
        return new MessagePathBuilder(this.path.concat(3, index));
    }

    public enum(index: number) {
        return new EnumPathBuilder(this.path.concat(4, index));
    }
}

export class EnumPathBuilder extends PathBuilder {
    public value(index: number) {
        return new PathBuilder(this.path.concat(2, index));
    }
}

export class ServicePathBuilder extends PathBuilder {
    public method(index: number) {
        return new PathBuilder(this.path.concat(2, index));
    }
}

export const file = new FilePathBuilder([]);
