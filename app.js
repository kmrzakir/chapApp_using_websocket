const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A suer is connected : ");

  // read data send from client
  socket.on("clent message", (msg) => {
    console.log("send from client : " + msg);
    //   send a message to all clients except the send of message
    socket.broadcast.emit("server message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
