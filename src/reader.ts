import { DescriptorProto, EnumDescriptorProto, EnumValueDescriptorProto, FieldDescriptorProto, FileDescriptorProto, MethodDescriptorProto, ServiceDescriptorProto, SourceCodeInfo } from 'google-protobuf/google/protobuf/descriptor_pb';
import { choose, map, toArrayOf } from './common/arrays';
import { asNonNullableOr, asNonNullableOrDie, bounce, broke, insteadNonNullable, insteadNonNullableOr, isNonNullable, isNullable } from './common/core';
import { atOr, fromArray } from './common/record';
import { isNullableOrEmpty } from './common/text';
import { DeclarationInfo } from './infos/declaration-info';
import { EnumInfo, EnumValueInfo } from './infos/enum-info';
import { FieldInfo } from './infos/field-info';
import { FileInfo } from './infos/file-info';
import { MessageInfo } from './infos/message-info';
import { MethodInfo } from './infos/method-info';
import { ReferenceInfo } from './infos/reference-info';
import { RepeatedInfo } from './infos/repeated-info';
import { ScalarInfo } from './infos/scalar-info';
import { ServiceInfo } from './infos/service-info';
import { TypeInfo } from './infos/type-info';
import { readMessageOptions, readMethodOptions } from './read-protobuf-extensions';
import { changeExtension } from './shared/filename';
import { NameBuilder, toName } from './shared/name-builder';
import { EnumPathBuilder, file, MessagePathBuilder, PathBuilder, ServicePathBuilder } from './shared/path-builder';

export function getFileInfo(
    descriptor: FileDescriptorProto,
): FileInfo {
    const originalName = asNonNullableOrDie(descriptor.getName(), 'The name of the file must be specified.');
    const fileName = changeExtension(originalName, '.proto', '');

    const packageName = toName(fileName)
        .add(asNonNullableOrDie(descriptor.getPackage(), 'The name of the package must be specified.'));

    const locations = toLocationsMap(descriptor.getSourceCodeInfo());

    const declarations = toArrayOf<DeclarationInfo>();

    declarations.push(...map(
        descriptor.getMessageTypeList(),
        (message, index) => getMessageInfo(
            message,
            file.message(index),
            packageName,
            locations,
        ),
    ));

    declarations.push(...map(
        descriptor.getEnumTypeList(),
        (enum_, index) => getEnumInfo(
            enum_,
            file.enum(index),
            packageName,
            locations,
        ),
    ));

    declarations.push(...map(
        descriptor.getServiceList(),
        (service, index) => getServiceInfo(
            service,
            file.service(index),
            packageName,
            locations,
        ),
    ));

    return new FileInfo(fileName, declarations);
}

function toLocationsMap(
    sourceCodeInfo: SourceCodeInfo | undefined,
): Record<string, SourceCodeInfo.Location> {
    return fromArray(
        asNonNullableOr(sourceCodeInfo?.getLocationList(), []),
        value => value.getPathList().join('.'),
        bounce,
        (_, adding) => adding,
    );
}

function getMessageInfo(
    message: DescriptorProto,
    path: MessagePathBuilder,
    fullname: NameBuilder,
    locations: Record<string, SourceCodeInfo.Location>,
): MessageInfo {
    const name = asNonNullableOrDie(message.getName(), 'The name of the message must be specified.');
    const messageName = fullname.add(name);
    const comments = tryGetLeadingComments(locations, path);
    const options = readMessageOptions(message.getOptions());

    const nested = toArrayOf<DeclarationInfo>();

    nested.push(...map(
        message.getNestedTypeList(),
        (nested, index) => getMessageInfo(
            nested,
            path.nested(index),
            messageName,
            locations,
        ),
    ));

    nested.push(...map(
        message.getEnumTypeList(),
        (enum_, index) => getEnumInfo(
            enum_,
            path.enum(index),
            messageName,
            locations,
        ),
    ));

    const oneOfList = choose(message.getOneofDeclList(), oneof => oneof.getName());

    const fields = map(
        message.getFieldList(),
        (value, index) => getFieldInfo(value, path.field(index), oneOfList, locations),
    );

    return new MessageInfo(name, messageName, comments, fields, nested, options);
}

function getEnumInfo(
    enum_: EnumDescriptorProto,
    path: EnumPathBuilder,
    fullname: NameBuilder,
    locations: Record<string, SourceCodeInfo.Location>,
): EnumInfo {
    const name = asNonNullableOrDie(enum_.getName(), 'The name of the enum must be specified.');
    const enumName = fullname.add(name);
    const comments = tryGetLeadingComments(locations, path);

    const values = map(
        enum_.getValueList(),
        (value, index) => getEnumValueInfo(value, path.value(index), locations),
    );

    return new EnumInfo(name, enumName, comments, values);
}

function getEnumValueInfo(
    enumValue: EnumValueDescriptorProto,
    path: PathBuilder,
    locations: Record<string, SourceCodeInfo.Location>,
): EnumValueInfo {
    const name = asNonNullableOrDie(enumValue.getName(), 'The name of the enum value must be specified.');
    const value = enumValue.getNumber();
    const comments = tryGetLeadingComments(locations, path);

    return new EnumValueInfo(name, comments, value);
}

function getFieldInfo(
    field: FieldDescriptorProto,
    path: PathBuilder,
    oneOfList: string[],
    locations: Record<string, SourceCodeInfo.Location>,
): FieldInfo {
    const name = asNonNullableOrDie(field.getName(), 'The name of the field must be specified.');
    const comments = tryGetLeadingComments(locations, path);

    const oneOf = field.hasOneofIndex()
        ? insteadNonNullable(field.getOneofIndex(), index => oneOfList[index])
        : undefined;

    const isOptional = field.getProto3Optional() ?? false;

    const type = getUnderlyingType(field);

    return new FieldInfo(name, comments, type, isOptional, oneOf);
}

function getUnderlyingType(
    field: FieldDescriptorProto,
): TypeInfo {
    const type = asNonNullableOrDie(field.getType(), 'The type of the field must be specified.');
    const typeName = field.getTypeName();
    const isRepeated = field.getLabel() === FieldDescriptorProto.Label.LABEL_REPEATED;

    const local = isReferenceType(type) && isNonNullable(typeName)
        ? new ReferenceInfo(typeName)
        : new ScalarInfo(toTypeName(type));

    return isRepeated
        ? new RepeatedInfo(local)
        : local;
}

function getServiceInfo(
    service: ServiceDescriptorProto,
    path: ServicePathBuilder,
    fullname: NameBuilder,
    locations: Record<string, SourceCodeInfo.Location>,
): ServiceInfo {
    const name = asNonNullableOrDie(service.getName(), 'The name of the service must be specified.');
    const serviceName = fullname.add(name);
    const comments = tryGetLeadingComments(locations, path);

    const methods = map(
        service.getMethodList(),
        (method, index) => getMethodInfo(method, path.method(index), locations),
    );

    return new ServiceInfo(name, serviceName, methods, comments);
}

function getMethodInfo(
    method: MethodDescriptorProto,
    path: PathBuilder,
    locations: Record<string, SourceCodeInfo.Location>,
): MethodInfo {
    const name = asNonNullableOrDie(method.getName(), 'The name of the method must be specified.');
    const comments = tryGetLeadingComments(locations, path);
    const options = readMethodOptions(method.getOptions());

    const inputType = insteadNonNullableOr(method.getInputType(), typeNameToReference, undefined);
    const outputType = insteadNonNullableOr(method.getOutputType(), typeNameToReference, undefined);

    return new MethodInfo(name, inputType, outputType, options, comments);
}

function typeNameToReference(typeName: string): ReferenceInfo | undefined {
    return typeName === '.google.protobuf.Empty'
        ? undefined
        : new ReferenceInfo(typeName);
}

function toTypeName(
    type: FieldDescriptorProto.Type,
): string {
    switch (type) {
        case FieldDescriptorProto.Type.TYPE_DOUBLE:
        case FieldDescriptorProto.Type.TYPE_FLOAT:
        case FieldDescriptorProto.Type.TYPE_INT64:
        case FieldDescriptorProto.Type.TYPE_UINT64:
        case FieldDescriptorProto.Type.TYPE_INT32:
        case FieldDescriptorProto.Type.TYPE_FIXED64:
        case FieldDescriptorProto.Type.TYPE_FIXED32:
        case FieldDescriptorProto.Type.TYPE_UINT32:
        case FieldDescriptorProto.Type.TYPE_SFIXED32:
        case FieldDescriptorProto.Type.TYPE_SFIXED64:
        case FieldDescriptorProto.Type.TYPE_SINT32:
        case FieldDescriptorProto.Type.TYPE_SINT64:
        case FieldDescriptorProto.Type.TYPE_ENUM:
            return 'number';
        case FieldDescriptorProto.Type.TYPE_BOOL:
            return 'boolean';
        case FieldDescriptorProto.Type.TYPE_STRING:
            return 'string';
        case FieldDescriptorProto.Type.TYPE_GROUP:
        case FieldDescriptorProto.Type.TYPE_MESSAGE:
        case FieldDescriptorProto.Type.TYPE_BYTES:
            return 'object';
        default:
            return broke(type);
    }
}

function isReferenceType(
    type: FieldDescriptorProto.Type,
): boolean {
    return type === FieldDescriptorProto.Type.TYPE_ENUM
        || type === FieldDescriptorProto.Type.TYPE_MESSAGE;
}

function tryGetLeadingComments(
    locations: Record<string, SourceCodeInfo.Location>,
    path: PathBuilder,
): string[] | undefined {
    return insteadNonNullable(
        atOr(locations, path.build(), undefined),
        location => toCommentLines(location.getLeadingComments()),
    );
}

function toCommentLines(value: string | undefined): string[] | undefined {
    if (isNullable(value)) return undefined;

    value = value.trimEnd();

    if (isNullableOrEmpty(value)) return undefined;

    return value.split(/\r?\n/);
}
