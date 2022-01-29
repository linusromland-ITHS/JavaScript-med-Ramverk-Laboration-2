//External Dependencies import:
const socketIO = require('socket.io');

//Local Dependencies import:
const { addMessage, isValidRoom } = require('./RoomDB');

//Variable Declarations:
let io; //Socket.io Object

exports.socketIOSetup = (server) => {
	io = socketIO(server);
	start();
};

function start() {
	io.on('connection', (socket) => {
		socket.on('message', async (data) => {
			if (
				data.message.length > 0 &&
				data.sender &&
				isValidRoom(data.room)
			) {
				const message = await addMessage(
					data.roomId,
					data.message,
					data.sender
				);
				io.emit(data.roomId, message);
			}
		});
	});
}
