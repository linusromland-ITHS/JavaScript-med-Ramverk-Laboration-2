import { createStore } from 'vuex';

import room from './modules/room';

const store = createStore({
	modules: {
		room
	},
	strict: true
});

export default store;
