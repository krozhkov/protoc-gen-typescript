#!/bin/bash

set -o errexit
# set -o nounset
set -o pipefail
#set -x

# This depends on a GOPATH variable and a version of grpc-gateway specified in the "mod" file
export GRPC_GATEWAY_MOD=$GOPATH/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@v1.16.0

function run() {
    mkdir -p $1/gen
    protoc \
    -I/usr/include/google/protobuf/ \
    -I. \
    -I$GRPC_GATEWAY_MOD/third_party/googleapis \
    -I$GRPC_GATEWAY_MOD \
    --plugin=./bin/protoc-gen-typescript \
    --typescript_out=paths=omit_base,enums=to_string_union:$1/gen \
    $(find $1 -iname "*.proto")
}

function debug() {
    mkdir -p $1/gen
    protoc \
    -I/usr/include/google/protobuf/ \
    -I. \
    -I$GRPC_GATEWAY_MOD/third_party/googleapis \
    -I$GRPC_GATEWAY_MOD \
    --plugin=./bin/protoc-gen-typescript_debug \
    --typescript_debug_out=paths=omit_base,enums=to_string_union:$1/gen \
    $(find $1 -iname "*.proto")
}

case $1 in

  'run')
    run $2
    ;;

  'debug')
    debug $2
    ;;

  *)
    echo "Usage: run|debug <dir>"
    ;;
esac
