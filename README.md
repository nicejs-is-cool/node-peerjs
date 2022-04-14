# Node PeerJS

[![npm version](https://badge.fury.io/js/peerjs-on-node.svg)](https://badge.fury.io/js/peerjs-on-node)

A port of the [PeerJS library](https://github.com/peers/peerjs) which currently only works on browsers. It uses the `wrtc` node module to provide webrtc functionality and fixes various compatibility issues with NodeJS.

## Install

```
npm i --save node-peerjs-client
```

## Usage

Just refer to the PeerJS documentation for a more detailed description of how the module works. You can also take a look at the `examples/` directory in this repo to see a small example using `peerjs-on-node`
- Import the module like this

    ```
    const Peer = require('node-peerjs-client').Peer;
    ```

## Build history

#### v1.0.0

- PeerJS code not included in this repo
- Cross-platform build script written in node
- Only builds PeerJS if necessary