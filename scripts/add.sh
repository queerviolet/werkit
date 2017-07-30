#!/bin/sh

pkg="packages/${1}"
cd "$pkg"
lerna bootstrap && \
npm install --save ${@:2} && \
lerna bootstrap