const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

const port=5000
console.log(`Server Started: Listening on port ${port} `);

io.on("connection", function(socket){
   
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
        console.log("[+] " + username + " joined the conversation");
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
        console.log("[+] " + username + " exited the conversation");
    });

    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
})

server.listen(port);
