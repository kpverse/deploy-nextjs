#!/bin/bash

BIN_PATH="./node_modules/.bin/"

rm -rf ./build/converted/
"${BIN_PATH}tsc" -p ./tsconfig.json
"${BIN_PATH}rollup" -c
node ./build/out/index.js