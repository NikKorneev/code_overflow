"use server";

import User from "@/db/user.model";
import { connectToDatabase } from "../mongoose";
import {
	CreateUserParams,
	DeleteUserParams,
	UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/db/question.model";

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

export async function createUserByClerkId(userData: CreateUserParams) {
	try {
		connectToDatabase();

		const newUser = await User.create(userData);

		return newUser;
	} catch (error) {
		throw error;
	}
}

export async function updateUser(params: UpdateUserParams) {
	try {
		connectToDatabase();

		const { clerkId, updateData, path } = params;

		await User.findOneAndUpdate({ clerkId }, updateData, {
			new: true,
		});

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function deleteUser(params: DeleteUserParams) {
	try {
		connectToDatabase();

		const { clerkId } = params;

		const user = await User.findOneAndDelete({ clerkId });

		if (!user) {
			throw new Error("user not found");
		}

		const userQuestionIds = await Question.find({
			author: user._id,
		}).distinct("_id");

		await Question.deleteMany({ author: user._id });

		const deletedUser = await User.findByIdAndDelete(user._id);

		return deletedUser;
	} catch (error) {
		throw error;
	}
}
