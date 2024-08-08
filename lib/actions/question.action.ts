"use server";

import Question from "@/db/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/db/tag.model";
import {
	CreateQuestionParams,
	GetQuestionByIdParams,
	GetQuestionsParams,
} from "./shared.types";
import User from "@/db/user.model";
import { revalidatePath } from "next/cache";
import { Question as QuestionType } from "@/types";

export async function getQuestions(params: GetQuestionsParams) {
	try {
		connectToDatabase();

		const result = await Question.find({})
			.populate({
				path: "tags",
				model: Tag,
			})
			.populate({
				path: "author",
				model: User,
			})
			.sort({ createdAt: -1 });

		return {
			questions: result,
		};
	} catch (error) {
		throw error;
	}
}

export async function createQuestion(params: CreateQuestionParams) {
	try {
		connectToDatabase();
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
		connectToDatabase();

		const question = (await Question.findById(questionId)
			.populate({
				path: "author",
				model: User,
				select: "_id clerkId name picture",
			})
			.populate({
				path: "tags",
				model: Tag,
				select: "_id name",
			})) as QuestionType;

		return question;
	} catch (error) {
		throw error;
	}
}
