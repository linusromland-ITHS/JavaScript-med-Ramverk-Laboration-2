//External Dependencies import:
const socketIO = require('socket.io');

//Local Dependencies import:
const { addMessage } = require('./RoomDB');

//Variable Declarations:
let io; //Socket.io Object

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
			io.emit(data.roomId, message);
		});
	});
}
