#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*
    rm -rf dist.zip

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist

    cp dist/index.html dist/popup.html
}

build