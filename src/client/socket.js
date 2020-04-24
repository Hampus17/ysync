const io = require('socket.io-client');

export default function() {
	const socket = io.connect('localhost:3001');

	function connect(username) {
		socket.emit('new-user', { username });
	}

	socket.on('error', (error) => {
		console.log(`Recieved socket error: ${error}`);
	})

	function register() {

	}

	return {
		connect, 
		register, 
	};
}
