import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
	mongoose.set("strictQuery", true);

	if (!process.env.MONGODB_URL)
		throw new Error("Invalid environment variable: MONGODB_URL");

	if (isConnected) {
		return;
	}

	try {
		const mong = await mongoose.connect(process.env.MONGODB_URL, {
			dbName: "codeoverflow",
		});
		isConnected = true;
		console.log("MongoDB connected: ", mong.connection.host);
	} catch (error) {
		throw new Error((error as Error).message);
	}
};
