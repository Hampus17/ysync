import React from 'react';
import YoutubeVideo from '../containers/YoutubeVideo';
import AddVideo from '../containers/AddVideo';
import User from '../components/User';

function App() {
	return (
		<div className='App'>
			<YoutubeVideo />
			<AddVideo />
			<User />
		</div>
	);
}

export default App;
