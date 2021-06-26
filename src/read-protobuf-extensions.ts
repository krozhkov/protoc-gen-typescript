import * as jspbd from 'google-protobuf/google/protobuf/descriptor_pb';
import { insteadNonNullableOr, isNullable } from './common/core';
import { MessageOptions } from './infos/options/message-options';

export function readMessageOptions(value: jspbd.MessageOptions | undefined): MessageOptions | undefined {
    if (isNullable(value)) return undefined;

    const extension = value.getExtension(proto.grpc.gateway.protoc_gen_swagger.options.openapiv2Schema);

    if (isNullable(extension)) return undefined;

    const asObject = extension.toObject();

    const options = new MessageOptions();

    options.required = insteadNonNullableOr(asObject.jsonSchema, schema => schema.requiredList, []);

    return options;
}
