const ObjectID = require('mongodb').ObjectID;

const Room = require('./models/Room');

exports.newRoom = async (name, private, password, adminPassword) => {
	if (name.length > 24) return;
	const room = new Room({ name, private, password, adminPassword });
	return await room.save();
};

exports.getAll = async () => {
	return await Room.find({}, '-password -adminPassword');
};

exports.getByName = async (name) => {
	const room = await Room.findOne({ name });
	return room;
};

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

exports.getFullRoom = async (id) => {
	const room = await Room.findOne({ _id: ObjectID(id) });
	return room;
};

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

exports.updateRoomName = async (id, name) => {
	await Room.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { name } });
};

exports.deleteRoom = async (id) => {
	await Room.findOneAndDelete({ _id: ObjectID(id) });
};

exports.isValidRoom = async (id) => {
	const room = await Room.findOne({ _id: ObjectID(id) });
	return room ? true : false;
};

exports.changeAdminPassword = async (id, password) => {
	await Room.findOneAndUpdate(
		{ _id: ObjectID(id) },
		{ $set: { adminPassword: password } }
	);
};

exports.changeRoomPassword = async (id, password) => {
	await Room.findOneAndUpdate(
		{ _id: ObjectID(id) },
		{ $set: { password: password } }
	);
};
