# Node PeerJS

A port of the [PeerJS library](https://github.com/peers/peerjs) which currently only works on browsers. It uses the `wrtc` node module to provide webrtc functionality and fixes various compatibility issues with NodeJS.

## Install

```
npm i --save node-peerjs
```

## Usage

Just refer to the PeerJS documentation for a more detailed description of how the module works. You can also take a look at the `examples/` directory in this repo to see a small example using `node-peerjs`

## Build history

#### v1.0.0

- Based on commit [0645dc3ddd51cbc1649ed13af56d9b66958fd62b](https://github.com/peers/peerjs/commit/0645dc3ddd51cbc1649ed13af56d9b66958fd62b) of PeerJS
- First release version that tries to make most of the peerJS functionality work on NodeJS
- See file `patch.diff` for all the modification made to the base PeerJS code and get it running on NodeJS
- PeerJS code not included in this repo
