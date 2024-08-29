import React, { useEffect, useMemo, useState } from "react";
import { Container, Stack, TextField, Typography } from "@mui/material";

import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:3000/"), []);

  const [messageArray, setMessageArray] = useState([]);
  const [message, setMessages] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessages("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join_room", roomName );
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("message", (data) => {
      console.log("message", data);
    });

    socket.on("receive", (data) => {
      console.log("receive", data);
      setMessageArray((props) => [...props, data]);
    });

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        Socket ID: {socketId}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          label="RoomName"
          variant="outlined"
        />
        <br />
        <button variant="contained" type="submit" color="primary">
          JOIN
        </button>
        <br />
        <br />
        <hr />
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessages(e.target.value)}
          label="Message"
          variant="outlined"
        />
        <br />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          label="Room"
          variant="outlined"
        />
        <br />
        <button variant="contained" type="submit" color="primary">
          Send
        </button>
      </form>

      {/* Display received messages */}
      <Stack spacing={2} mt={4}>
        {messageArray.map((msg, index) => (
          <Typography key={index} variant="h6" component="div" gutterBottom>
            {msg} {/* Display the content of each message */}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
}

export default App;
