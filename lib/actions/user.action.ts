"use server";

import User from "@/db/user.model";
import { connectToDatabase } from "../mongoose";
import {
	CreateUserParams,
	DeleteUserParams,
	GetAllUsersParams,
	GetUserInfo,
	GetUserStatsParams,
	ToggleSaveQuestionParams,
	UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/db/question.model";
import { redirect } from "next/navigation";
import Answer from "@/db/answer.model";
import { FilterQuery } from "mongoose";
import { escapeRegExp } from "../utils";

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

export async function getUsers({
	searchQuery,
	filter,
	page = 1,
	pageSize = 10,
}: GetAllUsersParams) {
	try {
		await connectToDatabase();

		const skipAmount = (page - 1) * pageSize;

		const query: FilterQuery<typeof User> = {};

		if (searchQuery) {
			query.$or = [
				{
					name: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
				{
					username: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
			];
		}

		let sortOptions = {};

		switch (filter) {
			case "new_users":
				sortOptions = { joinedAt: -1 };
				break;
			case "old_users":
				sortOptions = { joinedAt: 1 };
				break;
			case "top_contributors":
				sortOptions = { reputation: -1 };
				break;
			default:
				break;
		}

		const users = await User.find(query)
			.skip(skipAmount)
			.limit(pageSize)
			.sort(sortOptions);

		const totalUsers = await User.countDocuments(query);

		const isNext = totalUsers > skipAmount + users.length;

		return { users, isNext };
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

export async function getUserQuestions({
	userId,
	page = 1,
	pageSize = 10,
}: GetUserStatsParams) {
	try {
		await connectToDatabase();

		const skipAmount = (page - 1) * pageSize;

		const totalQuestions = await Question.countDocuments({
			author: userId,
		});

		const questions = await Question.find({ author: userId })
			.skip(skipAmount)
			.limit(pageSize)
			.sort({
				views: -1,
				upvotes: -1,
			})
			.populate("tags", "_id name")
			.populate("author", "_id clerkId name picture");

		const isNext = totalQuestions > skipAmount + questions.length;

		return { questions: questions || [], isNext };
	} catch (error) {
		throw error;
	}
}

export async function getUserAnswers({
	userId,
	page = 1,
	pageSize = 10,
}: GetUserStatsParams) {
	try {
		connectToDatabase();

		const skipAmount = (page - 1) * pageSize;

		const answers = await Answer.find({ author: userId })
			.populate("question", "_id title")
			.skip(skipAmount)
			.limit(pageSize)
			.sort({ upvotes: -1 });

		const totalAnswers = await Answer.countDocuments({
			author: userId,
		});

		const isNext = totalAnswers > skipAmount + answers.length;

		return { answers: answers || [], isNext };
	} catch (error) {
		alert("Something went very wrong. Please try again later.");
		throw error;
	}
}
