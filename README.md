# Socket Basics

#### Socket.io is a library of webSocket
##### WebSocket is a communication protocol like HTTP/FTTP/SMTP

- In HTTP, there are two components: Client and Server. The Client makes a request, upon which the Server responds, similar to how an API works. This is one-way communication.

- In WebSocket, a connection is made between the Client and Server. Once the connection is established, the Server can send a response or message at any time without requiring a request from the Client.

- WebSocket is a communication protocol that enables full-duplex (two-way) communication between a client and a server over a single, long-lived connection. Unlike HTTP, where communication is initiated by the client, WebSocket allows either the client or server to send messages at any time once the connection is established.

### Sockets

#### How Sockets Work
##### Socket Types:

-  **Stream Sockets (TCP):** These provide reliable, connection-oriented communication. They use the Transmission Control Protocol (TCP), ensuring that data is delivered in the correct order and without errors.
- **Datagram Sockets (UDP):** These provide connectionless communication. They use the User Datagram Protocol (UDP), which is faster but does not guarantee reliable delivery or order of packets.

#### Components
- **io**: Refers to the entire server or circuit.
- **socket**: Refers to one particular socket or client. Each socket has its own ID, allowing them to be differentiated.
- One **io** can contain many sockets.

#### Functions in Socket.io Library:

- **Emit**: Used to send a message from the server to the client or vice versa. `socket.emit('event_name', data);`
- **On**: Used to listen for a specific event and define what happens when that event occurs. `socket.on('event_name', callback);`
- **Broadcast**: Used to send a message to all connected clients except the one that initiated the broadcast. `socket.broadcast.emit('event_name', data);` 
- **To**: Used to send a message to a specific room or group of sockets. `io.to('room_name').emit('event_name', data);`
- **Join**: Allows a socket to join a specific room, enabling targeted messaging.`socket.join('room_name')`