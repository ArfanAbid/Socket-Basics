import express from 'express'
import cors from 'cors'

import { Server } from 'socket.io';
import { createServer } from 'http';


const port=3000;
const app=express()

const corsOptions={
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true,
}
app.use(cors(corsOptions))

const server=createServer(app); // creating an http server and returns an instance of the http.Server class. used for websockets 
const io = new Server(server, { // io is an instance of the Server class / circuit
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});


app.get('/',(req,res)=>{
    res.send('hello')
})


io.on("connection",(socket)=>{
    console.log("User Connected. ID: ",socket.id)
    
    socket.on("disconnect",()=>{
        console.log("User Disconnected. ID: ",socket.id)
    })
    // socket.emit("message",`Welcome to the server `);
    // socket.broadcast.emit("message",`New User Joined. ID: ${socket.id}`);


    socket.on("message",({message,room})=>{
        console.log(`message: ${message}, room: ${room}`)
        // io.emit("receive",data) // sending data to all connected clients
        // socket.broadcast.emit("receive",data)// sending data to all connected clients except the one that initiated the broadcast
        socket.to(room).emit("receive",message) // sending data to all connected clients in a specific room private chat
    })


    // Group Chat
    socket.on("join_room",(room)=>{
        socket.join(room)
        console.log(`User with ID: ${socket.id} joined room: ${room}`)
    })    


})

// app.listen internally create http server instance and calls listen method but we have created an http server instance using createServer() named server for our io so we use server.listen()
server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})