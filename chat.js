const peer = new Peer('my-kokos-labs-servers-that-anyone-can-use');

peer.on('open', id => {
    document.getElementById('peer-id').value = id;
    console.log(`Peer ID: ${id}`);
});

peer.on('error', err => {
    console.error(err);
    alert(`An error occurred: ${err}`);
});

let conn;

function connect() {
    const peerId = document.getElementById('peer-id').value;
    console.log(`Attempting to connect to peer ID: ${peerId}`);
    conn = peer.connect(peerId);

    conn.on('open', () => {
        console.log('Connection opened');
        conn.on('data', data => {
            console.log(`Received data: ${data}`);
            const messages = document.getElementById('messages');
            messages.innerHTML += `<p>${data}</p>`;
        });
    });

    conn.on('error', err => {
        console.error(`Connection error: ${err}`);
        alert(`Connection error: ${err}`);
    });
}

function sendMessage() {
    if (conn && conn.open) {
        const message = document.getElementById('message').value;
        console.log(`Sending message: ${message}`);
        conn.send(message);
        const messages = document.getElementById('messages');
        messages.innerHTML += `<p>You: ${message}</p>`;
        document.getElementById('message').value = '';
    } else {
        alert('Connection is not open. Please connect to a peer first.');
    }
}
