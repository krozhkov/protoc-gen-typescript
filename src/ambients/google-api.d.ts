import * as jspb from 'google-protobuf';
import { FieldWithDefault, RepeatedField, WrapperField } from './google-protobuf';

declare global {
    namespace proto.google.api {

        export const http: jspb.ExtensionFieldInfo<HttpRule>;

        export class HttpRule extends jspb.Message implements
            FieldWithDefault<'selector', string, HttpRule>,
            WrapperField<'get', string, HttpRule>,
            WrapperField<'put', string, HttpRule>,
            WrapperField<'post', string, HttpRule>,
            WrapperField<'delete', string, HttpRule>,
            WrapperField<'patch', string, HttpRule>,
            WrapperField<'custom', CustomHttpPattern, HttpRule>,
            FieldWithDefault<'body', string, HttpRule>,
            FieldWithDefault<'responseBody', string, HttpRule>,
            RepeatedField<'additionalBindings', HttpRule, HttpRule>
        {
            getPatternCase(): HttpRule.PatternCase;

            getSelector(): string;
            setSelector(value: string): this;

            getGet(): string;
            setGet(value: string): this;
            clearGet(): this;
            hasGet(): boolean;

            getPut(): string;
            setPut(value: string): this;
            clearPut(): this;
            hasPut(): boolean;

            getPost(): string;
            setPost(value: string): this;
            clearPost(): this;
            hasPost(): boolean;

            getDelete(): string;
            setDelete(value: string): this;
            clearDelete(): this;
            hasDelete(): boolean;

            getPatch(): string;
            setPatch(value: string): this;
            clearPatch(): this;
            hasPatch(): boolean;

            getCustom(): CustomHttpPattern | undefined;
            setCustom(value: CustomHttpPattern | undefined): this;
            clearCustom(): this;
            hasCustom(): boolean;

            getBody(): string;
            setBody(value: string): this;

            getResponseBody(): string;
            setResponseBody(value: string): this;

            getAdditionalBindingsList(): HttpRule[];
            setAdditionalBindingsList(value: HttpRule[]): this;
            addAdditionalBindings(value: HttpRule, index: number): this;
            clearAdditionalBindingsList(): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): HttpRule.AsObject;
        }

        export namespace HttpRule {
            export interface AsObject {
                selector: string;
                get: string;
                put: string;
                post: string;
                pb_delete: string;
                patch: string;
                custom?: CustomHttpPattern.AsObject;
                body: string;
                responseBody: string;
                additionalBindingsList: HttpRule.AsObject[];
            }

            export enum PatternCase {
                PATTERN_NOT_SET = 0,
                GET = 2,
                PUT = 3,
                POST = 4,
                DELETE = 5,
                PATCH = 6,
                CUSTOM = 8,
            }
        }

        export class CustomHttpPattern extends jspb.Message implements
            FieldWithDefault<'kind', string, CustomHttpPattern>,
            FieldWithDefault<'path', string, CustomHttpPattern>
        {
            getKind(): string;
            setKind(value: string): this;

            getPath(): string;
            setPath(value: string): this;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): CustomHttpPattern.AsObject;
        }

        export namespace CustomHttpPattern {
            export interface AsObject {
                kind: string;
                path: string;
            }
        }
    }
}
