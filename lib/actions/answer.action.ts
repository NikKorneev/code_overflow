"use server";

import Answer from "@/db/answer.model";
import { connectToDatabase } from "../mongoose";
import {
	AnswerVoteParams,
	CreateAnswerParams,
	GetAnswersParams,
} from "./shared.types";
import Question from "@/db/question.model";
import { revalidatePath } from "next/cache";
import { IAnswer } from "@/types";
import User from "@/db/user.model";

export async function createAnswer({
	author,
	content,
	path,
	question,
}: CreateAnswerParams) {
	try {
		connectToDatabase();

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
		connectToDatabase();

		const results = await Answer.find({
			question: questionId,
		})
			.populate({
				path: "author",
				model: User,
				select: "_id clerkId name picture username",
			})
			.sort({ createdAt: -1 });

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
		connectToDatabase();

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
		connectToDatabase();

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
