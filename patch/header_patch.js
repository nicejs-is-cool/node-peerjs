const wrtc = require('wrtc');
RTCPeerConnection = wrtc.RTCPeerConnection;
RTCIceCandidate = wrtc.RTCIceCandidate;
RTCSessionDescription = wrtc.RTCSessionDescription;

fetch = require('node-fetch');
WebSocket = require('ws');
FileReader = require('filereader');

Blob = require('node-blob');
const blobToArraybuffer = require('blob-to-arraybuffer');
Blob.prototype.arrayBuffer = function() {
    return blobToArraybuffer(this);
}
