const { v1 } = require('uuid');
const md5 = require('md5');
const { connectDB } = require('./connect-db');
const Route = require('express').Router();

const authenticationTokens = [];

async function assembleUserState(user) {
	try {
		let db = await connectDB();
		let tasks = await db.collection('tasks').find({ owner: user.id }).toArray();
		let groups = await db
			.collection('groups')
			.find({ owner: user.id })
			.toArray();

		return {
			tasks,
			groups,
			session: { authenticated: 'AUTHENTICATED', id: user.id },
		};
	} catch (error) {
		return error;
	}
}

Route.post('/authenticate', async (req, res) => {
	let { username, password } = req.body;
	try {
		let db = await connectDB();
		let collection = db.collection('users');

		let user = await collection.findOne({ name: username });

		if (!user) {
			return res.status(500).send('User not found');
		}

		let hash = md5(password);
		let passwordCorrect = hash === user.passwordHash;

		if (!passwordCorrect) {
			return res.status(500).send('Password incorrect');
		}

		let token = v1();
		authenticationTokens.push({
			token,
			userID: user.id,
		});

		let state = await assembleUserState(user);
		res.send({ token, state });
	} catch (error) {
		console.log(error);
		return error;
	}
});

module.exports = Route;
