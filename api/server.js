const express = require('express');
const cors = require('cors');
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const path = require('path');
const connectDB = require('./config/db')
const socket = require("socket.io");
const http = require('http');
connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/user/inbox', require('./routes/inboxRoute'))
app.use('/api/campaign', require('./routes/campaignRoute'))

 
app.use(errorHandler)
const port = process.env.PORT || 8000;
const server = http.createServer(app)

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

server.listen(port, ()=> { console.log(`Server started on port ${port}`) })



global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(onlineUsers)
    const sendUserSocket = onlineUsers.get(data.sendTo);
    console.log(sendUserSocket)
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-recieve", data);
    }
  });
});