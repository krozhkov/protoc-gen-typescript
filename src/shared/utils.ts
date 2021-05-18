import { FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import { Readable, Writable } from 'stream';
import { asNonNullableOrDie, crash } from '../common/core';

export function willReadStream(readable: Readable): Promise<Buffer> {
    return new Promise(resolve => {
        const result: Buffer[] = [];
        let totalLength = 0;

        // 'readable' may be triggered multiple times as data is buffered in
        readable.on('readable', () => {
            let chunk;
            // Use a loop to make sure we read all currently available data
            while (null !== (chunk = readable.read())) {
                if (!(chunk instanceof Buffer)) crash('An unexpected chunk type was read.');
                result.push(chunk);
                totalLength += chunk.length;
            }
        });

        readable.on('end', () => {
            resolve(Buffer.concat(result, totalLength));
        });
    });
}

export function willWriteToStream(writable: Writable, data: Uint8Array): Promise<void> {
    return new Promise(resolve => {
        const ok = writable.write(data, 'binary');

        if (ok) {
            resolve();
        } else {
            writable.once('drain', resolve);
        }
    })
}

export function dareDescriptorByName(
    descriptors: FileDescriptorProto[],
    fileName: string,
): FileDescriptorProto {
    return asNonNullableOrDie(
        descriptors.find(e => e.getName() === fileName),
        `Unable to find file descriptor ${fileName}.`,
    );
}
