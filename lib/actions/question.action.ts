"use server";

import Question from "@/db/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/db/tag.model";
import {
	CreateQuestionParams,
	DeleteQuestionParams,
	EditQuestionParams,
	GetQuestionByIdParams,
	GetQuestionsParams,
	GetSavedQuestionsParams,
	QuestionVoteParams,
} from "./shared.types";
import User from "@/db/user.model";
import { revalidatePath } from "next/cache";
import { Question as QuestionType } from "@/types";
import { FilterQuery } from "mongoose";
import { redirect } from "next/navigation";
import Answer from "@/db/answer.model";
import Interaction from "@/db/interaction.model";
import { escapeRegExp } from "../utils";

export async function getQuestions({
	filter,
	page,
	pageSize,
	searchQuery,
	saved,
	userId,
}: GetQuestionsParams) {
	try {
		await connectToDatabase();

		const query: FilterQuery<typeof Question> = {};

		if (searchQuery) {
			query.$or = [
				{
					title: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
				{
					content: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
			];
		}

		let sortOptions = {};

		switch (filter) {
			case "newest":
				sortOptions = { createdAt: -1 };
				break;
			case "frequent":
				sortOptions = { views: -1 };
				break;
			case "unanswered":
				query.answers = { $size: 0 };
				break;

			default:
				break;
		}

		const result = await Question.find(query)
			.populate({
				path: "tags",
				model: Tag,
			})
			.populate({
				path: "author",
				model: User,
			})
			.sort(sortOptions);

		return {
			questions: result,
		};
	} catch (error) {
		throw error;
	}
}

export async function createQuestion(params: CreateQuestionParams) {
	try {
		await connectToDatabase();
		const { title, content, tags, author, path } = params;

		const question = await Question.create({
			title,
			content,
			author,
		});

		const tagDocuments = [];

		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, "i") } },
				{
					$setOnInsert: { name: tag },
					$push: { questions: question._id },
				},
				{ upsert: true, new: true }
			);

			tagDocuments.push(existingTag._id);
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		});

		revalidatePath(path);
	} catch (error) {}
}

export async function getQuestionById({ questionId }: GetQuestionByIdParams) {
	try {
		await connectToDatabase();

		const question = (await Question.findById(questionId)
			.populate({
				path: "author",
				model: User,
				select: "_id clerkId name picture username",
			})
			.populate({
				path: "tags",
				model: Tag,
				select: "_id name",
			})) as QuestionType;

		if (!question) throw new Error("Question not found");
		return question;
	} catch (error) {
		redirect("/not-found");
	}
}

export async function upvoteQuestion({
	userId,
	hasupVoted,
	path,
	questionId,
	hasdownVoted,
}: QuestionVoteParams) {
	try {
		await connectToDatabase();

		if (hasupVoted) {
			await Question.findByIdAndUpdate(questionId, {
				$pull: { upvotes: userId },
			});
		} else if (hasdownVoted) {
			await Question.findByIdAndUpdate(questionId, {
				$push: { upvotes: userId },
				$pull: { downvotes: userId },
			});
		} else {
			await Question.findByIdAndUpdate(questionId, {
				$addToSet: { upvotes: userId },
			});
		}

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function downvoteQuestion({
	userId,
	hasdownVoted,
	path,
	questionId,
	hasupVoted,
}: QuestionVoteParams) {
	try {
		await connectToDatabase();

		if (hasdownVoted) {
			await Question.findByIdAndUpdate(questionId, {
				$pull: { downvotes: userId },
			});
		} else if (hasupVoted) {
			await Question.findByIdAndUpdate(questionId, {
				$push: { downvotes: userId },
				$pull: { upvotes: userId },
			});
		} else {
			await Question.findByIdAndUpdate(questionId, {
				$addToSet: { downvotes: userId },
			});
		}

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function getSavedQuestions({
	clerkId,
	filter,
	page,
	pageSize,
	searchQuery,
}: GetSavedQuestionsParams) {
	try {
		await connectToDatabase();

		const query: FilterQuery<typeof Question> = {};

		if (searchQuery) {
			query.$or = [
				{
					title: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
				{
					content: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
			];
		}

		let sortOptions = {};

		switch (filter) {
			case "most_recent":
				sortOptions = { createdAt: -1 };
				break;
			case "oldest":
				sortOptions = { createdAt: 1 };
				break;
			case "most_voted":
				sortOptions = { upvotes: -1 };
				break;
			case "most_viewed":
				sortOptions = { views: -1 };
				break;
			case "most_answered":
				sortOptions = { answers: -1 };
				break;

			default:
				break;
		}

		const res = await User.findOne({ clerkId }).populate({
			path: "saved",
			model: Question,
			match: query,
			options: {
				sort: sortOptions,
			},
			populate: [
				{ path: "tags", model: Tag, select: "_id name" },
				{
					path: "author",
					model: User,
					select: "_id clerkId name picture",
				},
			],
		});

		if (!res) {
			throw new Error("no user found");
		}

		return { questions: res.saved as QuestionType[] };
	} catch (error) {
		throw error;
	}
}

export async function deleteQuestion({
	questionId,
	path,
}: DeleteQuestionParams) {
	try {
		connectToDatabase();

		await Question.findByIdAndDelete(questionId);
		await Answer.deleteMany({ question: questionId });
		await Interaction.deleteMany({ question: questionId });

		await User.updateMany(
			{ saved: questionId },
			{ $pull: { saved: questionId } }
		);

		await Tag.updateMany(
			{ questions: questionId },
			{ $pull: { questions: questionId } }
		);

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function editQuestion({
	content,
	path,
	questionId,
	title,
}: EditQuestionParams) {
	try {
		connectToDatabase();

		const question = await Question.findByIdAndUpdate(questionId).populate(
			"tags"
		);

		if (!question) throw new Error("Question not found");

		question.title = title;
		question.content = content;

		await question.save();

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export async function getHotQuestions() {
	try {
		connectToDatabase();

		const hotQuestions = await Question.find({})
			.sort({ views: -1, upvotes: -1 })
			.limit(5);

		return { hotQuestions: hotQuestions || [] };
	} catch (error) {
		console.log(error);
		return { hotQuestions: [] };
	}
}
