const Peer = require('../index.js');

// FUNCTIONS --------------------------------------------------------------------------------------

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askForInput(promptStr){
    return new Promise((resolve, reject) => {
        readline.question(promptStr, (input) => {
            resolve(input);
        });
    })
}

// ------------------------------------------------------------------------------------------------

const peer = new Peer({debug: 2});

peer.on('open', async (localId) => {
    console.log(localId);

    const conn = peer.connect('abcdefghijklmnopqrstuvwxyz');
    conn.on('data', (data) => {
        console.log(data);
    });

    while (true) {
        const data = await askForInput('>');
        conn.send(data);
    }
})

