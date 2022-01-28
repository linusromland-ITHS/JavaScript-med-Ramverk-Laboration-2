//External Dependencies import:
const socketIO = require('socket.io');

//Local Dependencies import:
const { addMessage } = require('./RoomDB');

//Variable Declarations:
let io; //Socket.io Object
let usersTyping = [];

exports.socketIOSetup = (server) => {
	io = socketIO(server);
	start();
};

function start() {
	io.on('connection', (socket) => {
		socket.on('message', async (data) => {
			const message = await addMessage(
				data.roomId,
				data.message,
				data.sender
			);
			let i = usersTyping.findIndex(
				(user) => user.sender === data.sender
			);
			if (i >= 0) {
				usersTyping.splice(i, 1);
				sendUsersTypingInRoom(data.roomId);
			}

			io.emit(data.roomId, message);
		});

		socket.on('typing', (data) => {
			const sender = data.sender;
			const roomId = data.roomId;

			let i = usersTyping.findIndex((user) => user.sender === sender);
			if (i >= 0) {
				clearTimeout(usersTyping[i].timeout);
				usersTyping[i].timeout = setTimeout(() => {
					usersTyping.splice(i, 1);
					sendUsersTypingInRoom(roomId);
				}, 10000);
			} else {
				usersTyping.push({
					sender,
					roomId,
					timeout: setTimeout(() => {
						usersTyping.splice(i, 1);
						sendUsersTypingInRoom(roomId);
					}, 10000)
				});
				console.log('New User is typing!');
				sendUsersTypingInRoom(roomId);
			}
		});
	});
}

function sendUsersTypingInRoom(roomId) {
	let typing = usersTyping.filter((user) => user.roomId === roomId);
	//Remove timeouts from array of users typing
	typing.forEach((obj) => {
		delete obj['timeout'];
		delete obj['roomId'];
	});
	console.log(typing);
	io.emit(`${roomId}/typing`, typing);
}
