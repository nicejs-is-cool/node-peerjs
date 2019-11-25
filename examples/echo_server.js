const Peer = require('../index.js');

// MAIN -------------------------------------------------------------------------------------------

const peer = new Peer('abcdefghijklmnopqrstuvwxyz', {debug: 2});

peer.on('open', (localId) => {
    console.log(localId);
})

peer.on('connection', (conn) => {
    console.log('Got a connection');
    conn.on('data', (data) => {
        console.log(data);
        conn.send(`echo: ${data}`);
    });
    conn.send('Hello, I am the echo server');
});
