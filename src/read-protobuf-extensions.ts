import * as jspbd from 'google-protobuf/google/protobuf/descriptor_pb';
import { crash, insteadNonNullableOr, isNullable } from './common/core';
import { isNullableOrEmpty } from './common/text';
import { MessageOptions } from './infos/options/message-options';
import { MethodOptions } from './infos/options/method-options';

export function readMessageOptions(value: jspbd.MessageOptions | undefined): MessageOptions | undefined {
    if (isNullable(value)) return undefined;

    const extension = value.getExtension(proto.grpc.gateway.protoc_gen_swagger.options.openapiv2Schema);

    if (isNullable(extension)) return undefined;

    const asObject = extension.toObject();

    const options = new MessageOptions();

    options.required = insteadNonNullableOr(asObject.jsonSchema, schema => schema.requiredList, []);

    return options;
}

export function readMethodOptions(value: jspbd.MethodOptions | undefined): MethodOptions | undefined {
    if (isNullable(value)) return undefined;

    const extension = value.getExtension(proto.google.api.http);

    if (isNullable(extension)) return undefined;

    const options = new MethodOptions();

    const [httpMethod, url] = getHttpMethodInfo(extension);
    const body = extension.getBody();

    options.httpMethod = httpMethod;
    options.url = url;
    options.body = isNullableOrEmpty(body) ? undefined : body;

    return options;
}

function getHttpMethodInfo(extension: proto.google.api.HttpRule): ['GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', string] {
    if (extension.hasGet()) {
        return ['GET', extension.getGet()];
    } else if (extension.hasPost()) {
        return ['POST', extension.getPost()];
    } else if (extension.hasPut()) {
        return ['PUT', extension.getPut()];
    } else if (extension.hasDelete()) {
        return ['DELETE', extension.getDelete()];
    } else if (extension.hasPatch()) {
        return ['PATCH', extension.getPatch()];
    } else {
        return crash('Unsupported Http method.');
    }
}
