const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

app.get('/', function(res,res){
    res.sendFile(__dirname+"/index.html")
})

io.on('connection', function(socket){
    socket.join('kitchen-room');
    let roomSize = io.sockets.adapter.rooms.get("kitchen-room").size;
    io.sockets.in('kitchen-room').emit('cooking', roomSize  + "Fried Rice Cooking");
    io.sockets.in('kitchen-room').emit('boiling', "Boiling water = " + roomSize);

    socket.join('bad-room');
    io.sockets.in('bad-room').emit('sleep', "I'm sleeping");
    io.sockets.in('bad-room').emit('rest', "I'm taking rest");
})


expressServer.listen(3000 , function () {
    console.log("Server Is Running port: 3000",)
})