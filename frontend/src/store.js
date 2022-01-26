import { createStore } from 'vuex';

const state = {
	password: ''
};

const mutations = {
	joinRoom(state, password) {
		state.password = password;
	}
};

const store = createStore({
	state,
	mutations,
	strict: true
});

export default store;
