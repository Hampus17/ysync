import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';

import store from './state/store';

// declare a host of the party
// send the host timestamp every second
//      compare the other client to that timestamp
//      if time difference is more than 2 seconds update the time of video

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
