const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/geostream");


// Message schema
const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  time: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", messageSchema);


// user storage
let users = [];


io.on("connection", (socket) => {
let currentPoll = null;

socket.on("create_poll", (poll) => {

  currentPoll = {
    question: poll.question,
    options: poll.options.map(opt => ({
      text: opt,
      votes: 0
    }))
  };

  io.emit("poll_update", currentPoll);

});

socket.on("vote_poll", (index) => {

  if (!currentPoll) return;

  currentPoll.options[index].votes += 1;

  io.emit("poll_update", currentPoll);

});
  console.log("User connected:", socket.id);


  socket.on("join_room", async (data) => {

    socket.join(data.room);

    const user = {
      id: socket.id,
      username: data.username,
      room: data.room
    };

    users.push(user);

    const roomUsers = users.filter(u => u.room === data.room);

    io.to(data.room).emit("room_users", roomUsers);


    // send chat history
    const history = await Message.find({ room: data.room }).limit(50);

    socket.emit("chat_history", history);

  });


socket.on("send_message", async (data) => {

  const msg = new Message({
    room: data.room,
    author: data.author,
    message: data.message
  });

  const savedMessage = await msg.save();

  io.to(data.room).emit("receive_message", savedMessage);

});

  socket.on("typing", (data) => {

    socket.to(data.room).emit("user_typing", data.username);

  });


  socket.on("disconnect", () => {

    const user = users.find(u => u.id === socket.id);

    users = users.filter(u => u.id !== socket.id);

    if (user) {

      const roomUsers = users.filter(u => u.room === user.room);

      io.to(user.room).emit("room_users", roomUsers);

    }

    console.log("User disconnected");

  });

});


server.listen(5000, () => {
  console.log("Server running on port 5000");
});