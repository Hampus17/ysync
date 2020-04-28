const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let clients = [];
let host = '';

io.on('connection', function (client) { // client is the one sending server.js emits
	clients.push(client.id);
	host = clients[0];
	client.emit('clientID', client.id);
	io.emit('hostID', host);
	
	client.on('new-user', () => {
		console.log(`Client: ${client.id} 	connected.`);
	})

	client.on('video-started', (id) => {
		console.log(`Client: ${client.id} 	started the video.`);
		io.emit('start_video');
	});

	client.on('video-paused', (currentTime) => {
		console.log(`Client: ${client.id} 	paused the video (at ${Math.floor(currentTime)}s).`);
		io.emit('pause_video')
	});
	
	client.on('disconnect', () => {
		let index = clients.indexOf(client.id)
		console.log(`Client: ${client.id} 	disconnected.`);
		if (index > -1) 
			clients.splice(index, 1)
		
		client.emit('user_disconnected', client.id);
		host = clients[0];
		io.emit('hostID', host);
		console.log(`Client: ${host} 	is host.`);
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