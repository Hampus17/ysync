import React from 'react';
import YoutubeVideo from '../containers/YoutubeVideo';
import AddVideo from '../containers/AddVideo';

import client from '../client/socket';

function App() {
	return (
		<div className='App'>
			<YoutubeVideo />
			<AddVideo />
		</div>
	);
}

export default App;
