"use server";

import Answer from "@/db/answer.model";
import { connectToDatabase } from "../mongoose";
import {
	AnswerVoteParams,
	CreateAnswerParams,
	DeleteAnswerParams,
	GetAnswersParams,
} from "./shared.types";
import Question from "@/db/question.model";
import { revalidatePath } from "next/cache";
import User from "@/db/user.model";
import Interaction from "@/db/interaction.model";
import { Tag } from "lucide-react";

export async function createAnswer({
	author,
	content,
	path,
	question,
}: CreateAnswerParams) {
	try {
		await connectToDatabase();

		const answer = await Answer.create({
			author,
			content,
			question,
		});

		await Question.findByIdAndUpdate(question, {
			$push: { answers: answer._id },
		});

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function getAnswers({
	questionId,
	page,
	pageSize,
	sortBy,
}: GetAnswersParams) {
	try {
		await connectToDatabase();

		let sortOptions = {};
		switch (sortBy) {
			case "highestUpvotes":
				sortOptions = {
					upvotes: -1,
				};

				break;
			case "lowestUpvotes":
				sortOptions = {
					upvotes: 1,
				};
				break;
			case "recent":
				sortOptions = {
					createdAt: -1,
				};
				break;
			case "old":
				sortOptions = {
					createdAt: 1,
				};
				break;

			default:
				break;
		}

		const results = await Answer.find({
			question: questionId,
		})
			.populate({
				path: "author",
				model: User,
				select: "_id clerkId name picture username",
			})
			.sort(sortOptions);

		return { results };
	} catch (error) {
		throw error;
	}
}

export async function upvoteAnswer({
	answerId,
	userId,
	path,
	hasdownVoted,
	hasupVoted,
}: AnswerVoteParams) {
	try {
		await connectToDatabase();

		if (hasupVoted) {
			await Answer.findByIdAndUpdate(answerId, {
				$pull: { upvotes: userId },
			});
		} else if (hasdownVoted) {
			await Answer.findByIdAndUpdate(answerId, {
				$push: { upvotes: userId },
				$pull: { downvotes: userId },
			});
		} else {
			await Answer.findByIdAndUpdate(answerId, {
				$addToSet: { upvotes: userId },
			});
		}

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function downvoteAnswer({
	answerId,
	hasdownVoted,
	hasupVoted,
	path,
	userId,
}: AnswerVoteParams) {
	try {
		await connectToDatabase();

		if (hasdownVoted) {
			await Answer.findByIdAndUpdate(answerId, {
				$pull: { downvotes: userId },
			});
		} else if (hasupVoted) {
			await Answer.findByIdAndUpdate(answerId, {
				$push: { downvotes: userId },
				$pull: { upvotes: userId },
			});
		} else {
			await Answer.findByIdAndUpdate(answerId, {
				$addToSet: { downvotes: userId },
			});
		}
		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function deleteAnswer({ answerId, path }: DeleteAnswerParams) {
	try {
		connectToDatabase();

		const answer = await Answer.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}
		await Answer.deleteOne({ _id: answerId });
		await Question.findByIdAndUpdate(answer.question._id, {
			$pull: { answers: answerId },
		});
		await Interaction.deleteMany({ answer: answerId });

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}
