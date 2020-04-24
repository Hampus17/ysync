const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const ClientManager = require('./ClientManager');
const ChatroomManager = require('./ChatroomManager');
const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

io.on('connection', function (client) {

	//client.on('new-user', handleNewUser)
	
	//client.on('video-added', handleNewVideo);

	//client.on('join', handleJoin);
	
	client.on('error', (err) => {
		console.log("Recieved error from client: ", client.id);
		console.log(err);
	})
});

server.listen(port, (err) => {
	if (err) throw err
	console.log('listening on port', port)
})