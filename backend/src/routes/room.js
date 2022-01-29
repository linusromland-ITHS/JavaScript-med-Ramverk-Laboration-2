module.exports = (function () {
	//External Dependencies import:
	const express = require('express');

	//Local Dependencies Import:
	const RoomDB = require('../RoomDB');

	//Variable Declarations:
	const router = express.Router();

	/**
	 * @route GET /api/room/
	 * @desc Get all rooms
	 * @access Public
	 */
	router.get('/', async (req, res) => {
		const rooms = await RoomDB.getAll();
		if (!rooms) res.send().status(500);

		res.send(rooms).status(200);
	});

	/**
	 * @route GET /api/room/:id/
	 * @desc Get one room
	 * @access Public
	 * @param {string} id - The id of the room
	 */
	router.get('/:id/', async (req, res) => {
		const room = await RoomDB.getRoom(req.params.id);
		if (!room) res.send().status(500);
		else res.send(room).status(200);
	});

	/**
	 * @route POST /api/room/updateRoomName/:id/
	 * @desc Update the name of a room
	 * @access Private
	 * @param {string} id - The id of the room
	 * @param {string} name - The new name of the room
	 */
	router.post('/updateRoomName/:id', async (req, res) => {
		//Check if adminPassword is correct
		const room = await RoomDB.getFullRoom(req.params.id);
		if (req.body.password !== room.adminPassword) {
			res.send().status(401);
		} else {
			await RoomDB.updateRoomName(req.params.id, req.body.name);
			res.send(room).status(200);
		}
	});

	/**
	 * @route POST /api/room/deleteRoom/:id/
	 * @desc Deletes the room
	 * @access Private
	 * @param {string} id - The id of the room
	 */
	router.post('/deleteRoom/:id', async (req, res) => {
		//Check if adminPassword is correct
		const room = await RoomDB.getFullRoom(req.params.id);
		if (req.body.password !== room.adminPassword) {
			res.send().status(401);
		} else {
			await RoomDB.deleteRoom(req.params.id);
			res.send().status(200);
		}
	});

	/**
	 * @route POST /api/room/checkPassword/:id/
	 * @desc Check if the password is correct
	 * @access Public
	 * @param {string} id - The id of the room
	 * @param {string} password - The password of the room
	 */
	router.post('/checkPassword/:id/', async (req, res) => {
		const room = await RoomDB.getFullRoom(req.params.id);
		res.send(room.password === req.body.password).status(200);
	});

	/**
	 * @route POST /api/room/checkAdminPassword/:id/
	 * @desc Check if the admin password is correct
	 * @access Public
	 * @param {string} id - The id of the room
	 * @param {string} password - The password of the room
	 */
	router.post('/checkAdminPassword/:id/', async (req, res) => {
		const room = await RoomDB.getFullRoom(req.params.id);
		res.send(room.adminPassword === req.body.password).status(200);
	});

	/**
	 * @route POST /api/room/changeAdminPassword/:id/
	 * @desc Update the admin password of a room
	 * @access Private
	 * @param {string} id - The id of the room
	 * @param {string} password - The new password of the room
	 */
	router.post('/changeAdminPassword/:id/', async (req, res) => {
		//Check if oldPassword is correct
		const room = await RoomDB.getFullRoom(req.params.id);
		if (req.body.password !== room.adminPassword) {
			res.json({
				success: false,
				errorMessage: 'Wrong Password!'
			}).status(200);
		} else {
			await RoomDB.changeAdminPassword(req.params.id, req.body.newPassword);
			res.json({ success: true, errorMessage: '' }).status(200);
		}
	});

	/**
	 * @route POST /api/room/changeRoomPassword/:id/
	 * @desc Update the room password of a room
	 * @access Private
	 * @param {string} id - The id of the room
	 * @param {string} password - The new password of the room
	 */
	router.post('/changeRoomPassword/:id/', async (req, res) => {
		//Check if oldPassword is correct
		const room = await RoomDB.getFullRoom(req.params.id);
		if (req.body.password !== room.password) {
			res.json({
				success: false,
				errorMessage: 'Wrong Password!'
			}).status(200);
		} else {
			await RoomDB.changeRoomPassword(req.params.id, req.body.newPassword);
			res.json({ success: true, errorMessage: '' }).status(200);
		}
	});

	/**
	 * @route POST /api/room/new
	 * @desc Create a new room
	 * @access Public
	 * @param {string} name - The name of the room
	 * @param {string} password - The password of the room
	 * @param {string} adminPassword - The adminPassword of the room
	 * @param {boolean} private - Is the room private
	 */
	router.post('/new', async (req, res) => {
		const name = req.body.name;
		const private = req.body.private;
		const password = req.body.password;
		const adminPassword = req.body.adminPassword;

		if (await RoomDB.getByName(name)) {
			res.status(400).send('Room with that name already exists');
			return;
		}

		const room = await RoomDB.newRoom(name, private, password, adminPassword);
		if (!room) res.send().status(500);
		else res.send(room).status(200);
	});

	return router;
})();
