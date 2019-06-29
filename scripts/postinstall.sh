#!/usr/bin/env bash

sed -i -e 's/inlineRequires: true,/inlineRequires: false,/' ./node_modules/react-native/jest/preprocessor.js
