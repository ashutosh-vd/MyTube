import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

import debug from "debug";
const log = debug('development:MONGODB');

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
		log(`connection MONGODB succeed: ${connectionInstance.connection.name}`);
	}catch (err) {
		console.log("MONGODB CONNECTION ERROR", err.message);
		throw err;
		// process.exit(1);
	}
}

export default connectDB;
