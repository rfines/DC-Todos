import { compose, createStore } from 'redux';
import reducer from './reducers/index';
import { loadState, saveState } from './utils';

const persisted = loadState();


const store = createStore(
	reducer,
	persisted,
	compose(
		window.devToolsExtension ? window.devToolsExtension() : (func) => func
	)
);

store.subscribe(() => {
	saveState(store.getState());
});

export {store};