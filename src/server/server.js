const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const clients = [];

io.on('connection', function (client) { // client is the one sending server.js emits
	
	client.on('new-user', () => {
		clients.push(client.id);
		console.log(`${client.id} connected`);
	})

	client.on('start-video', () => {
		console.log("Video started by: ", client.id);
		io.emit('video_started');
	});

	client.on('pause-video', (currentTime) => {
		console.log(`Video paused by: ${client.id} (at ${currentTime}s)`);
		io.emit('video_paused', currentTime)
	});

	//client.on('video-added', handleNewVideo);

	//client.on('join', handleJoin);
	
	client.on('disconnect', () => {
		let index = clients.indexOf(client.id)
		console.log(`Client (#${client.id}) disconnected`);
		if (index > -1) 
			clients.splice(index, 1)

		client.emit('user_disconnected', client.id);
		return clients;
	})
	
	client.on('error', (err) => {
		console.log("Recieved error from client: ", client.id);
		console.log(err);
	})
});

server.listen(port, (err) => {
	if (err) throw err
	console.log('listening on port', port)
})