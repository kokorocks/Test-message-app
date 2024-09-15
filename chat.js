const peer = new Peer('my-kokos-labs-servers-that-anyone-can-use');

peer.on('open', id => {
    document.getElementById('peer-id').value = id;
});

let conn;

function connect() {
    const peerId = document.getElementById('peer-id').value;
    conn = peer.connect(peerId);

    conn.on('open', () => {
        conn.on('data', data => {
            const messages = document.getElementById('messages');
            messages.innerHTML += `<p>${data}</p>`;
        });
    });
}

function sendMessage() {
    const message = document.getElementById('message').value;
    conn.send(message);
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p>You: ${message}</p>`;
    document.getElementById('message').value = '';
}
