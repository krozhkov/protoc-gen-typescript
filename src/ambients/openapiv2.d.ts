import * as jspb from 'google-protobuf';
import { FieldWithDefault, MapField, RepeatedField, WrapperField } from './google-protobuf';

declare global {
    namespace proto.grpc.gateway.protoc_gen_swagger.options {

        export const openapiv2Schema: jspb.ExtensionFieldInfo<Schema>;
        export const openapiv2Operation: jspb.ExtensionFieldInfo<Operation>;

        export class Schema extends jspb.Message implements
            WrapperField<'jsonSchema', JSONSchema, Schema>,
            WrapperField<'externalDocs', ExternalDocumentation, Schema>,
            FieldWithDefault<'discriminator', string, Schema>,
            FieldWithDefault<'readOnly', boolean, Schema>,
            FieldWithDefault<'exampleString', string, Schema>
        {
            getJsonSchema(): JSONSchema | undefined;
            setJsonSchema(value: JSONSchema | undefined): this;
            clearJsonSchema(): this;
            hasJsonSchema(): boolean;

            getDiscriminator(): string;
            setDiscriminator(value: string): this;

            getReadOnly(): boolean;
            setReadOnly(value: boolean): this;

            getExternalDocs(): ExternalDocumentation | undefined;
            setExternalDocs(value: ExternalDocumentation | undefined): this;
            clearExternalDocs(): this;
            hasExternalDocs(): boolean;

            getExampleString(): string;
            setExampleString(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Schema.AsObject;
        }

        export namespace Schema {
            export type AsObject = {
                jsonSchema?: JSONSchema.AsObject;
                discriminator: string;
                readOnly: boolean;
                externalDocs?: ExternalDocumentation.AsObject;
                exampleString: string;
            };
        }

        export class Operation extends jspb.Message implements
            WrapperField<'externalDocs', ExternalDocumentation, Operation>,
            FieldWithDefault<'description', string, Operation>,
            FieldWithDefault<'summary', string, Operation>,
            FieldWithDefault<'operationId', string, Operation>,
            FieldWithDefault<'deprecated', boolean, Operation>,
            RepeatedField<'security', SecurityRequirement, Operation>,
            RepeatedField<'tags', string, Operation>,
            RepeatedField<'consumes', string, Operation>,
            RepeatedField<'produces', string, Operation>,
            RepeatedField<'schemes', string, Operation>,
            MapField<'responses', string, Response, Operation>
        {
            getTagsList(): string[];
            setTagsList(value: string[]): this;
            addTags(value: string, index: number): this;
            clearTagsList(): this;

            getSummary(): string;
            setSummary(value: string): this;

            getDescription(): string;
            setDescription(value: string): this;

            getExternalDocs(): ExternalDocumentation | undefined;
            setExternalDocs(value: ExternalDocumentation | undefined): this;
            clearExternalDocs(): this;
            hasExternalDocs(): boolean;

            getOperationId(): string;
            setOperationId(value: string): this;

            getConsumesList(): string[];
            setConsumesList(value: string[]): this;
            addConsumes(value: string, index: number): this;
            clearConsumesList(): this;

            getProducesList(): string[];
            setProducesList(value: string[]): this;
            addProduces(value: string, index: number): this;
            clearProducesList(): this;

            getResponsesMap(noLazyCreate?: boolean): jspb.Map<string, Response>;
            clearResponsesMap(): this;

            getSchemesList(): string[];
            setSchemesList(value: string[]): this;
            addSchemes(value: string, index: number): this;
            clearSchemesList(): this;

            getDeprecated(): boolean;
            setDeprecated(value: boolean): this;

            getSecurityList(): SecurityRequirement[];
            setSecurityList(value: SecurityRequirement[]): this;
            addSecurity(value: SecurityRequirement, index: number): this;
            clearSecurityList(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Operation.AsObject;
        }

        export namespace Operation {
            export type AsObject = {
                tagsList: string[];
                summary: string;
                description: string;
                externalDocs?: ExternalDocumentation.AsObject;
                operationId: string;
                consumesList: string[];
                producesList: string[];
                responsesMap: [string, Response.AsObject][];
                schemesList: string[];
                deprecated: boolean;
                securityList: string[];
            };
        }

        export class Header extends jspb.Message implements
            FieldWithDefault<'description', string, Header>,
            FieldWithDefault<'type', string, Header>,
            FieldWithDefault<'format', string, Header>,
            FieldWithDefault<'default', string, Header>,
            FieldWithDefault<'pattern', string, Header>
        {
            getDescription(): string;
            setDescription(value: string): this;

            getType(): string;
            setType(value: string): this;

            getFormat(): string;
            setFormat(value: string): this;

            getDefault(): string;
            setDefault(value: string): this;

            getPattern(): string;
            setPattern(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Header.AsObject;
        }

        export namespace Header {
            export type AsObject = {
                description: string;
                type: string;
                format: string;
                pb_default: string;
                pattern: string;
            };
        }

        export class Response extends jspb.Message implements
            FieldWithDefault<'description', string, Response>,
            WrapperField<'schema', Schema, Response>,
            MapField<'headers', string, Header, Response>,
            MapField<'examples', string, string, Response>
        {
            getDescription(): string;
            setDescription(value: string): this;

            getSchema(): Schema | undefined;
            setSchema(value: Schema | undefined): this;
            clearSchema(): this;
            hasSchema(): boolean;

            getHeadersMap(): jspb.Map<string, Header>;
            clearHeadersMap(): this;

            getExamplesMap(): jspb.Map<string, string>;
            clearExamplesMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Response.AsObject;
        }

        export namespace Response {
            export type AsObject = {
                description: string;
                schema?: Schema.AsObject;
                headersMap: [string, Header.AsObject][];
                examplesMap: [string, string][];
            };
        }

        export class JSONSchema extends jspb.Message implements
            FieldWithDefault<'ref', string, JSONSchema>,
            FieldWithDefault<'title', string, JSONSchema>,
            FieldWithDefault<'description', string, JSONSchema>,
            FieldWithDefault<'default', string, JSONSchema>,
            FieldWithDefault<'readOnly', boolean, JSONSchema>,
            FieldWithDefault<'example', string, JSONSchema>,
            FieldWithDefault<'multipleOf', number, JSONSchema>,
            FieldWithDefault<'maximum', number, JSONSchema>,
            FieldWithDefault<'exclusiveMaximum', boolean, JSONSchema>,
            FieldWithDefault<'minimum', number, JSONSchema>,
            FieldWithDefault<'exclusiveMinimum', boolean, JSONSchema>,
            FieldWithDefault<'maxLength', number, JSONSchema>,
            FieldWithDefault<'minLength', number, JSONSchema>,
            FieldWithDefault<'pattern', string, JSONSchema>,
            FieldWithDefault<'maxItems', number, JSONSchema>,
            FieldWithDefault<'minItems', number, JSONSchema>,
            FieldWithDefault<'uniqueItems', boolean, JSONSchema>,
            FieldWithDefault<'maxProperties', number, JSONSchema>,
            FieldWithDefault<'minProperties', number, JSONSchema>,
            RepeatedField<'required', string, JSONSchema>,
            RepeatedField<'array', string, JSONSchema>,
            RepeatedField<'type', JSONSchema.JSONSchemaSimpleTypes, JSONSchema>,
            FieldWithDefault<'format', string, JSONSchema>,
            RepeatedField<'enum', string, JSONSchema>
        {
            getRef(): string;
            setRef(value: string): this;

            getTitle(): string;
            setTitle(value: string): this;

            getDescription(): string;
            setDescription(value: string): this;

            getDefault(): string;
            setDefault(value: string): this;

            getReadOnly(): boolean;
            setReadOnly(value: boolean): this;

            getExample(): string;
            setExample(value: string): this;

            getMultipleOf(): number;
            setMultipleOf(value: number): this;

            getMaximum(): number;
            setMaximum(value: number): this;

            getExclusiveMaximum(): boolean;
            setExclusiveMaximum(value: boolean): this;

            getMinimum(): number;
            setMinimum(value: number): this;

            getExclusiveMinimum(): boolean;
            setExclusiveMinimum(value: boolean): this;

            getMaxLength(): number;
            setMaxLength(value: number): this;

            getMinLength(): number;
            setMinLength(value: number): this;

            getPattern(): string;
            setPattern(value: string): this;

            getMaxItems(): number;
            setMaxItems(value: number): this;

            getMinItems(): number;
            setMinItems(value: number): this;

            getUniqueItems(): boolean;
            setUniqueItems(value: boolean): this;

            getMaxProperties(): number;
            setMaxProperties(value: number): this;

            getMinProperties(): number;
            setMinProperties(value: number): this;

            getRequiredList(): string[];
            setRequiredList(value: string[]): this;
            addRequired(value: string, index: number): this;
            clearRequiredList(): this;

            getArrayList(): string[];
            setArrayList(value: string[]): this;
            addArray(value: string, index: number): this;
            clearArrayList(): this;

            getTypeList(): JSONSchema.JSONSchemaSimpleTypes[];
            setTypeList(value: JSONSchema.JSONSchemaSimpleTypes[]): this;
            addType(value: JSONSchema.JSONSchemaSimpleTypes, index: number): this;
            clearTypeList(): this;

            getFormat(): string;
            setFormat(value: string): this;

            getEnumList(): string[];
            setEnumList(value: string[]): this;
            addEnum(value: string, index: number): this;
            clearEnumList(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): JSONSchema.AsObject;
        }

        export namespace JSONSchema {
            export type AsObject = {
                ref: string;
                title: string;
                description: string;
                pb_default: string;
                readOnly: boolean;
                example: string;
                multipleOf: number;
                maximum: number;
                exclusiveMaximum: boolean;
                minimum: number;
                exclusiveMinimum: boolean;
                maxLength: number;
                minLength: number;
                pattern: string;
                maxItems: number;
                minItems: number;
                uniqueItems: boolean;
                maxProperties: number;
                minProperties: number;
                requiredList: string[];
                arrayList: string[];
                typeList: JSONSchema.JSONSchemaSimpleTypes[];
                format: string;
                enumList: string[];
            };

            export enum JSONSchemaSimpleTypes {
                UNKNOWN = 0,
                ARRAY = 1,
                BOOLEAN = 2,
                INTEGER = 3,
                NULL = 4,
                NUMBER = 5,
                OBJECT = 6,
                STRING = 7
            }
        }

        export class ExternalDocumentation extends jspb.Message implements
            FieldWithDefault<'description', string, ExternalDocumentation>,
            FieldWithDefault<'url', string, ExternalDocumentation>
        {
            getDescription(): string;
            setDescription(value: string): this;

            getUrl(): string;
            setUrl(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): ExternalDocumentation.AsObject;
        }

        export namespace ExternalDocumentation {
            export type AsObject = {
                description: string;
                url: string;
            }
        }

        export class SecurityRequirement extends jspb.Message implements
            MapField<'securityRequirement', string, SecurityRequirement.SecurityRequirementValue, SecurityRequirement>
        {
            getSecurityRequirementMap(): jspb.Map<string, SecurityRequirement.SecurityRequirementValue>;
            clearSecurityRequirementMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): SecurityRequirement.AsObject;
        }

        export namespace SecurityRequirement {
            export type AsObject = {
                securityRequirementMap: [string, SecurityRequirement.SecurityRequirementValue.AsObject][];
            };

            export class SecurityRequirementValue extends jspb.Message implements
                RepeatedField<'scope', string, SecurityRequirementValue>
            {
                getScopeList(): string[];
                setScopeList(value: string[]): this;
                addScope(value: string, index: number): this;
                clearScopeList(): this;

                serializeBinary(): Uint8Array;
                toObject(includeInstance?: boolean): SecurityRequirementValue.AsObject;
            }

            export namespace SecurityRequirementValue {
                export type AsObject = {
                    scopeList: string[];
                };
            }
        }
    }
}
