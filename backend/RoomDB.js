const ObjectID = require('mongodb').ObjectID;

const Room = require('./models/Room');

exports.newRoom = async (name, private, password, adminPassword) => {
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
	const room = await Room.findOne(
		{ _id: ObjectID(id) },
		'-password -adminPassword'
	);
	return room;
};

exports.getFullRoom = async (id) => {
	const room = await Room.findOne({ _id: ObjectID(id) });
	return room;
};
