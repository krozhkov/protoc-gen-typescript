export class MethodOptions {
    public readonly kind = 'method-options';

    public httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

    public url: string;

    public body: string | undefined;
}
