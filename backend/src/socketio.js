//External Dependencies import:
const socketIO = require('socket.io');

//Local Dependencies import:
const { addMessage, isValidRoom } = require('./RoomDB');

//Variable Declarations:
let io; //Socket.io Object

/**
 *
 * @param {HTTPServer Object} server - The Server Object to base the Socket.io Server on
 */
exports.socketIOSetup = (server) => {
	io = socketIO(server); //Create Socket.io Server
	start();
};

/**
 * @name start
 * @desc Startup function for the Socket.io Server
 */
function start() {
	io.on('connection', (socket) => {
		//When a client connects
		socket.on('message', async (data) => {
			//When a client sends a message
			if (
				data.message.length > 0 && //Checks if message is not empty
				data.sender && //Checks if sender is valid
				isValidRoom(data.room) //Checks if room is valid
			) {
				const message = await addMessage(
					//Add message to database
					data.roomId,
					data.message,
					data.sender
				);
				io.emit(data.roomId, message); //Send message to all clients in room
			}
		});
	});
}
