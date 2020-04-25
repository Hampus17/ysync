const io = require('socket.io-client');
const Video = require('../components/Video');

module.exports = function() {
	const socket = io.connect('localhost:3001');
	
	socket.on('video_paused', (time) => {
		Video.player.pauseVideo();
	});

	socket.on('video_started', () => {
		Video.player.playVideo();
	})

	function connect() {
		socket.emit('new-user');
	}

	function startVideo() {
		socket.emit('start-video')
	}

	function pauseVideo(currentTime) {
		socket.emit('pause-video', currentTime);
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
	};
}
