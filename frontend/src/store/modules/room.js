const state = {
	roomId: '',
	password: ''
};

const mutations = {
	joinRoom(obj) {
		console.log(obj);
		this.state.roomId = obj.roomId;
		this.state.password = obj.password;
	}
};

export default {
	state,
	mutations
};
