#!/bin/bash

# for Development purpose only

set -o errexit
# set -o nounset
set -o pipefail

mkdir -p $1/node_modules/protoc-gen-typescript
mkdir -p $1/node_modules/.bin

cp -r -f ./build $1/node_modules/protoc-gen-typescript
cp -r -f ./bin $1/node_modules/protoc-gen-typescript
cp -r -f ./node_modules $1/node_modules/protoc-gen-typescript
cp -r -f ./extensions $1/node_modules/protoc-gen-typescript
cp -f package.json $1/node_modules/protoc-gen-typescript

pushd $1/node_modules/.bin
ln -s ../protoc-gen-typescript/bin/protoc-gen-typescript protoc-gen-typescript
popd
