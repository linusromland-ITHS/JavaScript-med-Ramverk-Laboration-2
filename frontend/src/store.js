//External Dependencies import:
import { createStore } from 'vuex';

// Vuex states
const state = {
	password: ''
};

//Vuex mutations
const mutations = {
	joinRoom(state, password) {
		state.password = password;
	}
};

// Creates Vuex store
const store = createStore({
	state,
	mutations,
	strict: true
});

// Exports vuex store
export default store;
