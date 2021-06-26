import { CodeGeneratorRequest, CodeGeneratorResponse } from "google-protobuf/google/protobuf/compiler/plugin_pb";
import '../extensions/protoc-gen-swagger/options/annotations_pb';
import { FileInfo } from './infos/file-info';
import { readOptions } from './read-options';
import { getFileInfo } from './reader';
import { toBasePath } from './shared/filename';
import { Options } from './shared/options';
import { TextWriter } from './shared/text-writer';
import { dareDescriptorByName, willReadStream, willWriteToStream } from './shared/utils';
import { resolveReferences, transformEnumToUnion, transformGoInjectTag, transformOneOf, transformOneOfFallback } from './transforms';
import { TransformPipe } from './transforms/pipe';

async function main() {
    const buffer = await willReadStream(process.stdin);
    const request = CodeGeneratorRequest.deserializeBinary(buffer);

    const options = readOptions(request.getParameter());

    const files = request.getFileToGenerateList().map(fileName => {
        const descriptor = dareDescriptorByName(request.getProtoFileList(), fileName);

        return getFileInfo(descriptor);
    });

    const transformed = new TransformPipe(options)
        .pipe(transformGoInjectTag)
        .pipe(transformOneOf)
        .pipe(transformOneOfFallback)
        .pipe(transformEnumToUnion)
        .pipe(resolveReferences)
        .transform(files);

    const response = toCodeGeneratorResponse(transformed, options);

    await willWriteToStream(process.stdout, response.serializeBinary());
}

function toCodeGeneratorResponse(
    files: FileInfo[],
    options: Options,
): CodeGeneratorResponse {
    const response = new CodeGeneratorResponse();
    response.setSupportedFeatures(CodeGeneratorResponse.Feature.FEATURE_PROTO3_OPTIONAL);

    const basePath = toBasePath(...files.map(file => file.fileName));

    files.forEach(fileInfo => {
        const outfile = new CodeGeneratorResponse.File();

        const fileName = options.paths === 'omit_base'
            ? fileInfo.fileName.replace(basePath, '')
            : fileInfo.fileName;

        outfile.setName(fileName + '.ts');

        const writer = new TextWriter();

        fileInfo.write(writer);

        outfile.setContent(writer.dump());

        response.addFile(outfile);
    });

    return response;
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch(e => {
        process.stderr.write(e.message);
        process.exit(1);
    });
