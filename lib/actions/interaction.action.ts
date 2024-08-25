"use server";

import Question from "@/db/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/db/interaction.model";
import User from "@/db/user.model";

export async function viewQuestion({ questionId, userId }: ViewQuestionParams) {
	try {
		await connectToDatabase();

		const question = await Question.findByIdAndUpdate(
			questionId,
			{
				$inc: { views: 1 },
			},
			{ new: true }
		);

		if (+question.views % 50 === 0) {
			await User.findByIdAndUpdate(question.author, {
				$inc: { reputation: 5 },
			});
		}

		if (userId) {
			const existingInteraction = await Interaction.findOne({
				user: userId,
				action: "view",
				question: questionId,
			});
			if (existingInteraction) {
				existingInteraction.tags = question.tags;
				await existingInteraction.save();
				return;
			}

			await Interaction.create({
				user: userId,
				action: "view",
				question: questionId,
				tags: question.tags || [],
			});
		}
	} catch (error) {
		throw error;
	}
}
