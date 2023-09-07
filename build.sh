#!/bin/bash

BIN_PATH="./node_modules/.bin/"

rm -rf ./build/
"${BIN_PATH}tsc" -p ./tsconfig.json
"${BIN_PATH}rollup" -c