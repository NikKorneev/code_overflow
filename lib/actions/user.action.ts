"use server";

import User from "@/db/user.model";
import { connectToDatabase } from "../mongoose";

type Params = {
	userId: string;
};

export async function getUserById(params: Params) {
	try {
		connectToDatabase();

		const { userId } = params;
		const user = await User.findOne({ clerkId: userId });

		return user;
	} catch (error) {
		throw error;
	}
}
