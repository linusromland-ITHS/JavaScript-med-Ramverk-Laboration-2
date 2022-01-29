//External Dependencies import:
const ObjectID = require('mongodb').ObjectID;

//Local Dependencies import:
const Room = require('./models/Room');

/**
 * @name newRoom
 * @desc Creates a new room
 * @param {string} name - The name of the room
 * @param {boolean} private - Whether the room is private or not
 * @param {string} adminPassword - The admin password of the room
 * @param {string} password - The password of the room
 * @returns {object} The the room object
 */
exports.newRoom = async (name, private, password, adminPassword) => {
	if (name.length > 24) return;
	const room = new Room({ name, private, password, adminPassword });
	return await room.save();
};

/**
 * @name getAll
 * @desc Gets all rooms
 * @returns All rooms
 */
exports.getAll = async () => {
	return await Room.find({}, '-password -adminPassword');
};

/**
 * @name getByName
 * @desc Gets a room by name
 * @param {string} name - The name of the room to search for
 * @returns {object} The the room object
 */
exports.getByName = async (name) => {
	const room = await Room.findOne({ name }, '-password -adminPassword');
	return room;
};

/**
 * @name getRoom
 * @desc Gets a room by id
 * @param {string} id - The id of the room to search for
 * @returns {object} The the room object
 */
exports.getRoom = async (id) => {
	try {
		const room = await Room.findOne(
			{ _id: ObjectID(id) },
			'-password -adminPassword'
		);
		return room;
	} catch (err) {
		console.error('Crashed while getting room with id: ' + id);
		return;
	}
};

/**
 * @name getFullRoom
 * @desc Gets a room by id including passwords
 * @param {string} id - The id of the room to search for
 * @returns {object} The the room object
 */
exports.getFullRoom = async (id) => {
	const room = await Room.findOne({ _id: ObjectID(id) });
	return room;
};

/**
 * @name addMessage
 * @desc Adds a message to a room
 * @param {string} id - The id of the room to add the message to
 * @param {string} message - The message to add
 * @param {string} sender - The sender of the message
 * @returns {object} The the message object
 */
exports.addMessage = async (id, message, sender) => {
	const messageObj = {
		message,
		sender,
		sentAt: new Date()
	};
	await Room.findOneAndUpdate(
		{ _id: ObjectID(id) },
		{ $push: { messages: messageObj } }
	);

	return messageObj;
};

/**
 * @name updateRoomName
 * @desc Updates the name of a room
 * @param {string} id - The id of the message
 * @param {string} name - The updated room name
 */
exports.updateRoomName = async (id, name) => {
	await Room.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { name } });
};

/**
 * @name deleteRoom
 * @desc Deletes a room
 * @param {string} id - The id of the room to delete
 */
exports.deleteRoom = async (id) => {
	await Room.findOneAndDelete({ _id: ObjectID(id) });
};

/**
 * @name isValidRoom
 * @desc Checks if a room exists
 * @param {string} id - The id of the roo
 * @returns
 */
exports.isValidRoom = async (id) => {
	const room = await Room.findOne({ _id: ObjectID(id) });
	return room ? true : false;
};

/**
 * @name changeAdminPassword
 * @desc Changes the admin password of a room
 * @param {string} id - The id of the room to update admin password on
 * @param {string} password - The new admin password
 */
exports.changeAdminPassword = async (id, password) => {
	await Room.findOneAndUpdate(
		{ _id: ObjectID(id) },
		{ $set: { adminPassword: password } }
	);
};

/**
 * @name changeRoomPassword
 * @desc Changes the room password of a room
 * @param {string} id - The id of the room to update room password on
 * @param {string} password - The new room password
 */
exports.changeRoomPassword = async (id, password) => {
	await Room.findOneAndUpdate(
		{ _id: ObjectID(id) },
		{ $set: { password: password } }
	);
};
