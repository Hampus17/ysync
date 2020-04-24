import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import player from './state/reducers';
const store = createStore(player, applyMiddleware(thunk));

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
