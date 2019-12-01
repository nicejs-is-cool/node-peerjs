const Peer = require('../index.js').Peer;

// MAIN -------------------------------------------------------------------------------------------

// Claim this ID on the peerJS signalling server so that clients can connect to it directly
// without having to coordinate this key with each other through other means
const peer = new Peer('abcdefghijklmnopqrstuvwxyz', {debug: 2});

peer.on('open', (localId) => {
    console.log(localId);
})

peer.on('connection', (conn) => {
    console.log('Got a connection');

    conn.on('open', () => {
        conn.on('data', (data) => {
            console.log(data);
            conn.send(`echo: ${data}`);
        });

        conn.send('Hello, I am the echo server');
    })
});
