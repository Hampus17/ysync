import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import player from '../reducers';
const store = createStore(player, applyMiddleware(thunk));

export default store;