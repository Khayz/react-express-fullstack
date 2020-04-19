const { MongoClient } = require('mongodb');

let db = null;

async function connectDB() {
	try {
		let client = await MongoClient.connect(
			// HERE SET YOUR MONGO CONNECTION,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		db = client.db();
		return db;
	} catch (error) {
		return error;
	}
}

connectDB();

module.exports = { connectDB };
