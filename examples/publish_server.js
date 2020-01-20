const Peer = require('../index.js').Peer;

// MAIN -------------------------------------------------------------------------------------------

// Claim this ID on the peerJS signalling server so that clients can connect to it directly
// without having to coordinate this key with each other through other means
const peer = new Peer('abcdefghijklmnopqrstuvwxyz', {debug: 2});

let publishInterval = null;
let count = 0;

peer.on('open', (localId) => {
    console.log(localId);
})

peer.on('connection', (conn) => {
    console.log('Got a connection');

    conn.on('open', () => {
        conn.on('data', (data) => {
            console.log(data);
        });

        conn.send('Hello, I am the echo server');

        publishInterval = setInterval(() => {
            count += 1;
            conn.send('publish ' + count)
            console.log('Sent ' + count)
        }, 1000)
    })

    conn.on('disconnected', () => {
        console.log('PEER DISCONNECTED');

        clearInterval(publishInterval);
        publishInterval = null;
        count = 0;
    });

    conn.on('error', (err) => {
        console.log('PEER ERROR');
        console.log(err);

        clearInterval(publishInterval);
        publishInterval = null;
        count = 0;
    });

    conn.on('close', () => {
        console.log('PEER CLOSED');

        clearInterval(publishInterval);
        publishInterval = null;
        count = 0;
    });
});
