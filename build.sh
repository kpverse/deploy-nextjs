#!/bin/bash

rm -rf ./build/
npx tsc -p ./tsconfig.json
npx rollup -c
npx swc ./bin/index.js -o ./bin/index.js