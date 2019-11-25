#!/bin/bash

exec 2>&1

# If the repo is not there then we have nothing to build. Exit
[ ! -d "./peerjs" ] && echo "PeerJS source code not found at ./peerjs. Clone it from https://github.com/peers/peerjs.git" && exit

rm -rf dist/
cd peerjs

# Generate a file documenting the changes made to peerjs source code for future reference
git diff -- . ':(exclude)dist/*' > ../patch.diff

# Build the existing peerjs project into ../dist
../node_modules/.bin/parcel build --no-source-maps lib/exports.ts -d ../dist --out-file peerjs.min.js
cd ../

# Append some of our modifications onto the built peerjs code
cat header_patch.js dist/peerjs.min.js footer_patch.js > dist/react-native-peerjs.js
rm dist/peerjs.min.js

echo "Done. dist/react-native-peerjs.js"
