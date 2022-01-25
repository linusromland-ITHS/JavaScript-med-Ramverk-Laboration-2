import { createStore } from 'vuex';

const store = createStore({
	state: {
		roomId: '',
		password: ''
	},
	mutations: {
		joinRoom(obj) {
			console.log(obj);
			this.state.roomId = obj.roomId;
			this.state.password = obj.password;
		}
	},
	strict: true
});

export default store;
