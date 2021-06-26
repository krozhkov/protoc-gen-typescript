import { ResolveReferences } from './resolve-references';
import { TransformEnumToUnion } from './transform-enum-to-union';
import { TransformGoInjectTag } from './transform-go-inject-tag';
import { TransformMessageOptions } from './transform-message-options';
import { TransformOneOf } from './transform-oneof';
import { TransformOneOfFallback } from './transform-oneof-fallback';

export const resolveReferences = new ResolveReferences();

export const transformEnumToUnion = new TransformEnumToUnion();

export const transformGoInjectTag = new TransformGoInjectTag();

export const transformOneOfFallback = new TransformOneOfFallback();

export const transformOneOf = new TransformOneOf();

export const transformMessageOptions = new TransformMessageOptions();
