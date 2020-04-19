const express = require('express');
const cors = require('cors');
const { connectDB } = require('./connect-db');
require('./initialize-db');
const authenticationRoute = require('./authenticate');

let app = express();

// DB Schemas
const addNewTask = async (task) => {
	try {
		let db = await connectDB();
		let collection = db.collection('tasks');
		await collection.insertOne(task);
	} catch (error) {
		return error;
	}
};

const updateTask = async (task) => {
	let { id, group, isComplete, name } = task;

	try {
		let db = await connectDB();
		let collection = db.collection('tasks');

		if (group) {
			await collection.updateOne({ id }, { $set: { group } });
		}
		if (name) {
			await collection.updateOne({ id }, { $set: { name } });
		}
		if (isComplete !== undefined) {
			await collection.updateOne({ id }, { $set: { isComplete } });
		}
	} catch (error) {
		return error;
	}
};

// Middlewares
app.use(cors(), express.urlencoded({ extended: true }), express.json());

// Routes
app.use('/', authenticationRoute);
app.post('/task/new', async (req, res) => {
	try {
		let task = req.body.task;
		await addNewTask(task);
		res.status(200).send('Task added');
	} catch (error) {
		return error;
	}
});

app.post('/task/update', async (req, res) => {
	try {
		let task = req.body.task;
		await updateTask(task);
		res.status(200).send('Task added');
	} catch (error) {
		return error;
	}
});

let port = '7777';
app.listen(port, console.log('Server Listening in port' + port));

module.exports = { addNewTask, updateTask };
