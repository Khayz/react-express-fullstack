import { createStore } from 'redux';
import { defaultState } from '../../server/defaultState';

export const store = createStore(function reducer(state, action) {
	return state;
}, defaultState);
