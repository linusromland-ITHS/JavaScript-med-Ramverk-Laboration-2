//External Dependencies import:
import { createStore } from 'vuex';

// Vuex states
const state = {
	password: '',
	chatError: false
};

//Vuex mutations
const mutations = {
	joinRoom(state, password) {
		state.password = password;
	},
	setChatError(state, error) {
		state.chatError = error;
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
