// reimplementation of build.sh in JS so its platform independent
const fs = require('fs');
const pfs = require('fs').promises;
const { spawn } = require('child_process');
const path = require('path');

const cwd = process.cwd();

function spawnAsync(...args) {
    return new Promise((resolve, reject) => {
        const proc = spawn(...args);
        proc.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`${args[0]} exited with code ${code}`));
            }
        });
    });
}
(async()=>{
    if (!fs.existsSync("./peerjs")) {
        console.log('node-peerjs: unable to find peerjs folder; cloning the repository from github')
        await spawnAsync('git', ['clone', 'https://github.com/peers/peerjs.git', 'peerjs'], {stdio: 'inherit', shell: true});
    }
    if (fs.existsSync("./peerjs")) {
        await pfs.rm("./dist/", {recursive: true, force: true}).catch(err => console.error(err));
    }
    await pfs.mkdir("./dist/");
    // build peerjs
    console.log('node-peerjs: building peerjs')
    await spawnAsync(path.join(cwd, "./node_modules/.bin/parcel"), [
        'build', 
        '--no-source-maps', 'lib/exports.ts', 
        '-d', '../dist', 
        '--out-file', 'peerjs.min.js'
    ], {cwd: 'peerjs', stdio: 'inherit', shell: true});

    console.log('node-peerjs: patching peerjs');
    const peerjs = await pfs.readFile(path.join(cwd, 'peerjs/dist/peerjs.min.js'), 'utf8');
    const header_patch = await pfs.readFile(path.join(cwd, "./patch/header_patch.js"), "utf-8");
    const footer_patch = await pfs.readFile(path.join(cwd, "./patch/footer_patch.js"), "utf-8");
    const patched = `${header_patch}
    ${peerjs}
    ${footer_patch}`;
    await pfs.writeFile(path.join(cwd, 'dist/peerjs-on-node.js'), patched, 'utf8');
    console.log('node-peerjs: done; output: dist/peerjs-on-node.js');

})();
