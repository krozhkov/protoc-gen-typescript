import { filter } from '../common/arrays';
import { atop, isNullable } from '../common/core';
import { isEmpty } from '../common/record';
import { FileInfo } from '../infos/file-info';
import { MethodInfo } from '../infos/method-info';
import { ServiceInfo } from '../infos/service-info';
import { Options } from '../shared/options';
import { FileTransformNode } from './transform-node';

export class TransformAddServicePrefix implements FileTransformNode {
    public readonly kind = 'transform-file';

    public transform(file: FileInfo, options: Options): FileInfo {
        if (isNullable(options.sprefix) || isEmpty(options.sprefix)) return file;

        const keys = Object.keys(options.sprefix);
        const ruleKey = keys.find(key => file.fileName.startsWith(key));

        if (isNullable(ruleKey)) return file;

        const prefix = options.sprefix[ruleKey];

        const services = filter(file.declarations, (e): e is ServiceInfo => e.kind === 'service');

        if (services.length === 0) return file;

        services.forEach(service => {
            this.addPrefixToAllMethods(service, prefix);
        });

        return file;
    }

    private addPrefixToAllMethods(service: ServiceInfo, prefix: string): void {
        service.methods.forEach(method => {
            this.addPrefixToMethod(method, prefix);
        });
    }

    private addPrefixToMethod(method: MethodInfo, prefix: string): void {
        if (isNullable(method.options)) return;

        method.options = atop(method.options, {
            url: prefix + method.options.url,
        });
    }
}
