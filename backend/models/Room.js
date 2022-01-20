//External Dependencies import
const { Schema, model } = require('mongoose');

//Creates the Schema
const RoomSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	private: {
		type: Boolean,
		required: true
	},
	password: {
		type: String
	},
	adminPassword: {
		type: String,
		required: true
	},
	messages: {
		message: {
			type: String
		},
		sender: {
			type: String
		},
		sentAt: {
			type: Date
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

//Creates the model from Schema
const Room = model('Room', RoomSchema);

//Exports the model
module.exports = Room;
