
export function chainable<T>(
    value: T,
): Chainable<T> {
    return new Chainable(value);
}

class Chainable<T> {
    public constructor(
        private value: T,
    ) { }

    public chain(func: (value: T) => T): this {
        this.value = func(this.value);
        return this;
    }

    public get(): T {
        return this.value;
    }
}
