const Peer = require('../index.js').Peer;

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

    // Connect to the server peer whose ID we already know
    const conn = peer.connect('abcdefghijklmnopqrstuvwxyz');

    conn.on('open', async () => {
        conn.on('data', async (data) => {
            console.log(data);

            const newUserInput = await askForInput('>');
            conn.send(newUserInput);
        });

        const userInput = await askForInput('>');
        conn.send(userInput);
    });
})

