const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

//our localhost port
const port = process.env.PORT || 4001;

const app = express();

//server instance
const server = http.createServer(app);

//creates our socket using the instance of the server
const io = socketIO(server);

// this is what the socket.io syntax is like. We will work with this later.
io.on("connection", socket => {
  socket.on("seek request", e => {
    console.log(`seeking to ${parseFloat(e)}`);
    io.sockets.emit("seek request", parseFloat(e));
  });

  socket.on("change url", url => {
    console.log(url);
    console.log(`a change request to the URL has been made`);
    io.sockets.emit("change url", url);
  });

  socket.on("sync request", played => {
    console.log(`syncing to ${played}`);
    io.sockets.emit(`sync request`, played);
  });

  socket.on("playback change", playbackRate => {
    console.log(`changing the playback speed to ${playbackRate}`);
    io.sockets.emit("playback change", playbackRate);
  });

  socket.on("play request", () => {
    console.log(`a play request has been made`);
    io.sockets.emit("play request");
  });

  socket.on("pause request", () => {
    console.log(`a pause request has been made`);
    io.sockets.emit("pause request");
  });

  socket.on("stop request", () => {
    io.sockets.emit("stop request");
  });

  socket.on("rewind", () => {
    io.sockets.emit("rewind");
  });

  socket.on("fast forward", () => {
    io.sockets.emit("fast forward");
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
