const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

//our localhost port
const port = process.env.PORT || 4004;

const app = express();

//server instance
const server = http.createServer(app);

//creates our socket using the instance of the server
const io = socketIO(server);

// this is what the socket.io syntax is like. We will work with this later.
io.on("connection", socket => {
  socket.on("join room", data => {
    socket.join(data.roomID);
    console.log(`joined room ${data.roomID}`);
  });

  //this sends us the body of the message and the username of it
  socket.on("message", (message, roomID) => {
    console.log(message, roomID);
    io.sockets.in(`${roomID}`).emit("send message", message);
  });

  socket.on("seek request", data => {
    console.log(`seeking to ${parseFloat(data.played)}`);
    io.sockets
      .in(`${data.roomID}`)
      .emit("seek request", parseFloat(data.played));
  });

  socket.on("change url", data => {
    console.log(data.url);
    console.log(`a change request to the URL has been made`);
    io.sockets.in(`${data.roomID}`).emit("change url", data.url);
  });

  socket.on("sync request", data => {
    console.log(`syncing to ${data.played}`);
    io.sockets.in(`${data.roomID}`).emit(`sync request`, data.played);
  });

  socket.on("playback change", data => {
    console.log(`changing the playback speed to ${data.playbackRate}`);
    io.sockets.in(`${data.roomID}`).emit("playback change", data.playbackRate);
  });

  socket.on("play request", data => {
    console.log(`a play request has been made`);
    io.sockets.in(`${data.roomID}`).emit("play request");
  });

  socket.on("pause request", data => {
    console.log(`a pause request has been made`);
    io.sockets.in(`${data.roomID}`).emit("pause request");
  });

  socket.on("stop request", data => {
    console.log(data.roomID);
    io.sockets.in(`${data.roomID}`).emit("stop request");
  });

  socket.on("rewind", data => {
    console.log(`${data.roomID}`);
    io.sockets.in(`${data.roomID}`).emit("rewind");
  });

  socket.on("fast forward", data => {
    console.log(`${data.roomID}`);
    io.sockets.in(`${data.roomID}`).emit("fast forward");
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
