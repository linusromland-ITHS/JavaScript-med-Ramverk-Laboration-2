const state = {
	roomId: '',
	password: ''
};

const mutations = {
	joinRoom(state, obj) {
		state.roomId = obj.roomId;
		state.password = obj.password;
	}
};

export default {
	state,
	mutations
};
