const server = require("http").createServer();
const io = require("socket.io")(server);

const conversation = [];
let allUsers = ["jack", "smith", "john", "jane"];
const availableUsers = [];
io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("init", (callback) => {
    console.log("init");
    io.emit("users", allUsers); 
    callback();
  });
  socket.on("message_init", (callback) => {
    io.emit("messages", conversation);
    io.emit("availbleUsers", availableUsers);
    callback();
  });
  socket.on("adduser", ({ author }) => {
    allUsers = allUsers.filter((u) => u !== author);
    availableUsers.push(author);

    io.emit("users", allUsers);
    io.emit("availbleUsers", availableUsers);
  });

  socket.on("disconnect", () => {
    console.log("Connection closed");
  });

  socket.on("sendmessage", (NewMessage, callback) => {
    conversation.push(NewMessage);
    io.emit("message", NewMessage);
    callback();
  });
});

const port = 5000;
io.listen(port);
console.log("listening on port", port);
