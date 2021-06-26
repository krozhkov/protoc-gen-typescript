import * as jspb from 'google-protobuf';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { Value } from 'google-protobuf/google/protobuf/struct_pb';
import { FieldWithDefault, MapField, RepeatedField, WrapperField } from './google-protobuf';

declare global {
    namespace proto.grpc.gateway.protoc_gen_swagger.options {

        export const openapiv2Swagger: jspb.ExtensionFieldInfo<Swagger>;
        export const openapiv2Operation: jspb.ExtensionFieldInfo<Operation>;
        export const openapiv2Schema: jspb.ExtensionFieldInfo<Schema>;
        export const openapiv2Tag: jspb.ExtensionFieldInfo<Tag>;
        export const openapiv2Field: jspb.ExtensionFieldInfo<JSONSchema>;

        export class Swagger extends jspb.Message implements
            FieldWithDefault<'swagger', string, Swagger>,
            WrapperField<'info', Info, Swagger>,
            FieldWithDefault<'host', string, Swagger>,
            FieldWithDefault<'basePath', string, Swagger>,
            RepeatedField<'schemes', Swagger.SwaggerScheme, Swagger>,
            RepeatedField<'consumes', string, Swagger>,
            RepeatedField<'produces', string, Swagger>,
            MapField<'responses', string, Response, Swagger>,
            WrapperField<'securityDefinitions', SecurityDefinitions, Swagger>,
            RepeatedField<'security', SecurityRequirement, Swagger>,
            WrapperField<'externalDocs', ExternalDocumentation, Swagger>,
            MapField<'extensions', string, Value, Swagger>
        {
            getSwagger(): string;
            setSwagger(value: string): this;

            getInfo(): Info | undefined;
            setInfo(value: Info | undefined): this;
            clearInfo(): this;
            hasInfo(): boolean;

            getHost(): string;
            setHost(value: string): this;

            getBasePath(): string;
            setBasePath(value: string): this;

            getSchemesList(): Swagger.SwaggerScheme[];
            setSchemesList(value: Swagger.SwaggerScheme[]): this;
            addSchemes(value: Swagger.SwaggerScheme, index: number): this;
            clearSchemesList(): this;

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

            getSecurityDefinitions(): SecurityDefinitions | undefined;
            setSecurityDefinitions(value: SecurityDefinitions | undefined): this;
            clearSecurityDefinitions(): this;
            hasSecurityDefinitions(): boolean;

            getSecurityList(): SecurityRequirement[];
            setSecurityList(value: SecurityRequirement[]): this;
            addSecurity(value: SecurityRequirement, index: number): this;
            clearSecurityList(): this;

            getExternalDocs(): ExternalDocumentation | undefined;
            setExternalDocs(value: ExternalDocumentation | undefined): this;
            clearExternalDocs(): this;
            hasExternalDocs(): boolean;

            getExtensionsMap(noLazyCreate?: boolean): jspb.Map<string, Value>;
            clearExtensionsMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Swagger.AsObject;
        }

        export namespace Swagger {
            export interface AsObject {
                swagger: string;
                info?: Info.AsObject;
                host: string;
                basePath: string;
                schemesList: Swagger.SwaggerScheme[];
                consumesList: string[];
                producesList: string[];
                responsesMap: [string, Response.AsObject][];
                securityDefinitions?: SecurityDefinitions.AsObject;
                securityList: SecurityRequirement.AsObject[];
                externalDocs?: ExternalDocumentation.AsObject;
                extensionsMap: [string, Value.AsObject][];
            }

            export enum SwaggerScheme {
                UNKNOWN = 0,
                HTTP = 1,
                HTTPS = 2,
                WS = 3,
                WSS = 4,
            }
        }

        export class Info extends jspb.Message implements
            FieldWithDefault<'title', string, Info>,
            FieldWithDefault<'description', string, Info>,
            FieldWithDefault<'termsOfService', string, Info>,
            WrapperField<'contact', Contact, Info>,
            WrapperField<'license', License, Info>,
            FieldWithDefault<'version', string, Info>,
            MapField<'extensions', string, Value, Info>
        {
            getTitle(): string;
            setTitle(value: string): this;

            getDescription(): string;
            setDescription(value: string): this;

            getTermsOfService(): string;
            setTermsOfService(value: string): this;

            getContact(): Contact | undefined;
            setContact(value: Contact | undefined): this;
            clearContact(): this;
            hasContact(): boolean;

            getLicense(): License | undefined;
            setLicense(value: License | undefined): this;
            clearLicense(): this;
            hasLicense(): boolean;

            getVersion(): string;
            setVersion(value: string): this;

            getExtensionsMap(noLazyCreate?: boolean): jspb.Map<string, Value>;
            clearExtensionsMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): {};
        }

        export namespace Info {
            export interface AsObject {
                title: string;
                description: string;
                termsOfService: string;
                contact?: Contact.AsObject;
                license?: License.AsObject;
                version: string;
                extensionsMap: [string, Value.AsObject][];
            }
        }

        export class SecurityDefinitions extends jspb.Message implements
            MapField<'security', string, SecurityScheme, SecurityDefinitions>
        {
            getSecurityMap(noLazyCreate?: boolean): jspb.Map<string, SecurityScheme>;
            clearSecurityMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): {};
        }

        export namespace SecurityDefinitions {
            export interface AsObject {
                securityMap: [string, SecurityScheme.AsObject][];
            }
        }

        export class SecurityScheme extends jspb.Message implements
            FieldWithDefault<'type', SecurityScheme.Type, SecurityScheme>,
            FieldWithDefault<'description', string, SecurityScheme>,
            FieldWithDefault<'name', string, SecurityScheme>,
            FieldWithDefault<'in', SecurityScheme.In, SecurityScheme>,
            FieldWithDefault<'flow', SecurityScheme.Flow, SecurityScheme>,
            FieldWithDefault<'authorizationUrl', string, SecurityScheme>,
            FieldWithDefault<'tokenUrl', string, SecurityScheme>,
            WrapperField<'scopes', Scopes, SecurityScheme>,
            MapField<'extensions', string, Value, SecurityScheme>
        {
            getType(): SecurityScheme.Type;
            setType(value: SecurityScheme.Type): this;

            getDescription(): string;
            setDescription(value: string): this;

            getName(): string;
            setName(value: string): this;

            getIn(): SecurityScheme.In;
            setIn(value: SecurityScheme.In): this;

            getFlow(): SecurityScheme.Flow;
            setFlow(value: SecurityScheme.Flow): this;

            getAuthorizationUrl(): string;
            setAuthorizationUrl(value: string): this;

            getTokenUrl(): string;
            setTokenUrl(value: string): this;

            getScopes(): Scopes | undefined;
            setScopes(value: Scopes | undefined): this;
            clearScopes(): this;
            hasScopes(): boolean;

            getExtensionsMap(noLazyCreate?: boolean): jspb.Map<string, Value>;
            clearExtensionsMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): SecurityScheme.AsObject;
        }

        export namespace SecurityScheme {
            export interface AsObject {
                type: SecurityScheme.Type;
                description: string;
                name: string;
                pb_in: SecurityScheme.In;
                flow: SecurityScheme.Flow;
                authorizationUrl: string;
                tokenUrl: string;
                scopes?: Scopes.AsObject;
                extensionsMap: [string, Value.AsObject][];
            }

            export enum Type {
                TYPE_INVALID = 0,
                TYPE_BASIC = 1,
                TYPE_API_KEY = 2,
                TYPE_OAUTH2 = 3,
            }

            export enum In {
                IN_INVALID = 0,
                IN_QUERY = 1,
                IN_HEADER = 2,
            }

            export enum Flow {
                FLOW_INVALID = 0,
                FLOW_IMPLICIT = 1,
                FLOW_PASSWORD = 2,
                FLOW_APPLICATION = 3,
                FLOW_ACCESS_CODE = 4,
            }
        }

        export class Scopes extends jspb.Message implements
            MapField<'scope', string, string, Scopes>
        {
            getScopeMap(noLazyCreate?: boolean): jspb.Map<string, string>;
            clearScopeMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Scopes.AsObject;
        }

        export namespace Scopes {
            export interface AsObject {
                scopeMap: [string, string][];
            }
        }

        export class License extends jspb.Message implements
            FieldWithDefault<'name', string, License>,
            FieldWithDefault<'url', string, License>
        {
            getName(): string;
            setName(value: string): this;

            getUrl(): string;
            setUrl(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): License.AsObject;
        }

        export namespace License {
            export interface AsObject {
                name: string;
                url: string;
            }
        }

        export class Contact extends jspb.Message implements
            FieldWithDefault<'name', string, Contact>,
            FieldWithDefault<'url', string, Contact>,
            FieldWithDefault<'email', string, Contact>
        {
            getName(): string;
            setName(value: string): this;

            getUrl(): string;
            setUrl(value: string): this;

            getEmail(): string;
            setEmail(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Contact.AsObject;
        }

        export namespace Contact {
            export interface AsObject {
                name: string;
                url: string;
                email: string;
            }
        }

        export class Schema extends jspb.Message implements
            WrapperField<'jsonSchema', JSONSchema, Schema>,
            WrapperField<'externalDocs', ExternalDocumentation, Schema>,
            FieldWithDefault<'discriminator', string, Schema>,
            FieldWithDefault<'readOnly', boolean, Schema>,
            WrapperField<'example', Any, Schema>,
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

            getExample(): Any | undefined;
            setExample(value: Any | undefined): this;
            clearExample(): this;
            hasExample(): boolean;

            getExampleString(): string;
            setExampleString(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Schema.AsObject;
        }

        export namespace Schema {
            export interface AsObject {
                jsonSchema?: JSONSchema.AsObject;
                discriminator: string;
                readOnly: boolean;
                externalDocs?: ExternalDocumentation.AsObject;
                example?: Any.AsObject;
                exampleString: string;
            }
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
            MapField<'responses', string, Response, Operation>,
            MapField<'extensions', string, Value, Operation>
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

            getExtensionsMap(noLazyCreate?: boolean): jspb.Map<string, Value>;
            clearExtensionsMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Operation.AsObject;
        }

        export namespace Operation {
            export interface AsObject {
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
                securityList: SecurityRequirement.AsObject[];
                extensionsMap: [string, Value.AsObject][];
            }
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
            export interface AsObject {
                description: string;
                type: string;
                format: string;
                pb_default: string;
                pattern: string;
            }
        }

        export class Response extends jspb.Message implements
            FieldWithDefault<'description', string, Response>,
            WrapperField<'schema', Schema, Response>,
            MapField<'headers', string, Header, Response>,
            MapField<'examples', string, string, Response>,
            MapField<'extensions', string, Value, Response>
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

            getExtensionsMap(noLazyCreate?: boolean): jspb.Map<string, Value>;
            clearExtensionsMap(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Response.AsObject;
        }

        export namespace Response {
            export interface AsObject {
                description: string;
                schema?: Schema.AsObject;
                headersMap: [string, Header.AsObject][];
                examplesMap: [string, string][];
                extensionsMap: [string, Value.AsObject][];
            }
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
            export interface AsObject {
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
            }

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
            export interface AsObject {
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
            export interface AsObject {
                securityRequirementMap: [string, SecurityRequirement.SecurityRequirementValue.AsObject][];
            }

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
                export interface AsObject {
                    scopeList: string[];
                }
            }
        }

        export class Tag extends jspb.Message implements
            FieldWithDefault<'description', string, Tag>,
            WrapperField<'externalDocs', ExternalDocumentation, Tag>
        {
            getDescription(): string;
            setDescription(value: string): this;

            getExternalDocs(): ExternalDocumentation | undefined;
            setExternalDocs(value: ExternalDocumentation | undefined): this;
            clearExternalDocs(): this;
            hasExternalDocs(): boolean;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Tag.AsObject;
        }

        export namespace Tag {
            export interface AsObject {
                description: string;
                externalDocs?: ExternalDocumentation.AsObject;
            }
        }
    }
}
