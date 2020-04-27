const io = require('socket.io-client');
const Video = require('../components/Video');

module.exports = function() {
	const socket = io.connect('192.168.0.41:3001');
	let clientID;
	let hostID;
	let pState = false;
	
	socket.on('pause_video', () => {
		Video.player.pauseVideo();
		pState = false;
	});

	socket.on('start_video', () => {
		Video.player.playVideo();
		pState = true;
	})
	
	socket.on('clientID', (id) => {
		clientID = id;
	});

	socket.on('hostID', (id) => {
		hostID = id;
	});

	function getClientID() { return clientID;	}
	function getHostID() { return hostID; }
	function playingState() { return pState; }

	function connect() {
		socket.emit('new-user');
	}

	function startVideo(id) {
		socket.emit('video-started', id)
	}

	function pauseVideo(currentTime) {
		socket.emit('video-paused', currentTime);
	}

	socket.on('error', (error) => {
		console.log(`Recieved socket error: ${error}`);
	})

	function register() {

	}

	return {
		connect, 
		register, 
		pauseVideo, 
		startVideo,
		getClientID,
		getHostID,
		playingState,
	};
}
