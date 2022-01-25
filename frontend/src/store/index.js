import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import room from './modules/room';
import user from './modules/user';

const nameState = createPersistedState({
	paths: ['name']
});

const store = createStore({
	modules: {
		room,
		user
	},
	plugins: [nameState],
	strict: true
});

export default store;
