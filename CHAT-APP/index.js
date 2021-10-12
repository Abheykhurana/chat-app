const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const path = require("path");

app.use("/", express.static(path.join(__dirname, "public")));

const users = {};

io.on("connection", (socket) => {
  console.log(`CONNECTED TO ${socket.id}.`);

  socket.on("send_msg", (data) => {
    // console.log(data);

    io.emit("rec_msg", {
      msg: data.msg,
      user: users[socket.id],
    });
  });

  socket.on("login", (data) => {
    users[socket.id] = data.user;
  });
});
const port = process.env.PORT || 2323;

server.listen(port, () => {
  console.log(`SERVER LISTENING AT PORT ${port}`);
});
