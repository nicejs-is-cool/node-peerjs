# node-peerjs examples

- The example scripts in this directory implements a simple echo server over a P2P webRTC connection using `node-peerjs`
- Run the server
    
    ```
    node echo_server.js
    ```

    - The echo server tries claims the id of `abcdefghijklmnopqrstuvwxyz` on the PeerJS signalling server
- Run the client in a separate terminal window

    ```
    node echo_client.js
    ```

    - The client script allows the signalling server to give it an arbirary id
    - It initiates a direct connection to our server which we know has an id of `abcdefghijklmnopqrstuvwxyz`
- You can now type in anything into the client terminal and the echo server script will simple echo it back
