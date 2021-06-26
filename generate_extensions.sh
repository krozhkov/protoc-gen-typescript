#!/bin/bash

set -o errexit
set -o pipefail

# This depends on a GOPATH variable and a version of grpc-gateway
export GRPC_GATEWAY_MOD=$GOPATH/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@v1.16.0
export OUTPUT_PATH=extensions

mkdir -p $OUTPUT_PATH

# generate code for swagger options
export SWAGGER_OPTIONS=$GRPC_GATEWAY_MOD/protoc-gen-swagger/options

protoc \
    -I$GRPC_GATEWAY_MOD \
    --js_out=import_style=commonjs,binary:$OUTPUT_PATH \
    $SWAGGER_OPTIONS/*.proto
