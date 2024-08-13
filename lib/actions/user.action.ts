"use server";

import User from "@/db/user.model";
import { connectToDatabase } from "../mongoose";
import {
	CreateUserParams,
	DeleteUserParams,
	GetAllUsersParams,
	GetUserInfo,
	ToggleSaveQuestionParams,
	UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/db/question.model";
import { redirect } from "next/navigation";
import Answer from "@/db/answer.model";

type Params = {
	userId: string;
};

export async function getUserById(params: Params) {
	try {
		await connectToDatabase();

		const { userId } = params;
		const user = await User.findOne({ clerkId: userId });

		return user;
	} catch (error) {
		throw error;
	}
}

export async function createUserByClerkId(userData: CreateUserParams) {
	try {
		await connectToDatabase();

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
		await connectToDatabase();

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

export async function getUsers(params: GetAllUsersParams) {
	try {
		await connectToDatabase();
		// const { page = 1, pageSize = 20, filter, searchQuery } = params;

		const users = await User.find({}).sort({ createdAt: -1 });

		return { users };
	} catch (error) {
		throw error;
	}
}

export async function saveQuestion({
	path,
	questionId,
	userId,
	hasSaved,
}: ToggleSaveQuestionParams) {
	try {
		await connectToDatabase();

		if (hasSaved) {
			await User.findByIdAndUpdate(userId, {
				$pull: {
					saved: questionId,
				},
			});
		} else {
			await User.findByIdAndUpdate(userId, {
				$addToSet: {
					saved: questionId,
				},
			});
		}

		revalidatePath(path);
	} catch (error) {
		redirect("/not-found");
	}
}

export async function getUserProfile(params: GetUserInfo) {
	try {
		await connectToDatabase();

		const res = await User.findOne({ username: params.username });

		if (!res) throw new Error();

		const totalQuestions = await Question.countDocuments({
			author: res._id,
		});

		const totalAnswers = await Answer.countDocuments({
			author: res._id,
		});

		return { user: res, totalAnswers, totalQuestions };
	} catch (error) {
		redirect("/not-found");
	}
}
