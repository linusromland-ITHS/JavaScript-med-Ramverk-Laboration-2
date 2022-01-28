const socketIO = require('socket.io');

//Variable Declarations:
let io; //Socket.io Object

exports.socketIOSetup = (server) => {
	io = socketIO(server);
	start();
};

function start() {
	io.on('connection', (socket) => {});
}
