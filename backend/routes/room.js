module.exports = (function () {
	const express = require('express');
	const router = express.Router();
	const RoomDB = require('../RoomDB');

	router.post('/new', async (req, res) => {
		const name = req.body.name;
		const private = req.body.private;
		const password = req.body.password;
		const adminPassword = req.body.adminPassword;

		if (await RoomDB.getByName(name)) {
			res.status(400).send('Room with that name already exists');
			return;
		}

		const room = await RoomDB.newRoom(
			name,
			private,
			password,
			adminPassword
		);
		if (!room) res.send().status(500);
		else res.send(room).status(200);
	});

	router.get('/', async (req, res) => {
		const rooms = await RoomDB.getAll();
		if (!rooms) res.send().status(500);

		res.send(rooms).status(200);
	});

	router.get('/:id/', async (req, res) => {
		const room = await RoomDB.getRoom(req.params.id);
		if (!room) res.send().status(500);
		else
			res.send({
				name: room.name,
				private: room.private,
				messages: room.messages
			}).status(200);
	});

	return router;
})();
