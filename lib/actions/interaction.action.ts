"use server";

import Question from "@/db/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/db/interaction.model";

export async function viewQuestion({ questionId, userId }: ViewQuestionParams) {
	try {
		await connectToDatabase();

		await Question.findByIdAndUpdate(questionId, {
			$inc: { views: 1 },
		});

		if (userId) {
			const existingInteraction = await Interaction.findOne({
				user: userId,
				action: "view",
				question: questionId,
			});
			if (existingInteraction) return;

			await Interaction.create({
				user: userId,
				action: "view",
				question: questionId,
			});
		}
	} catch (error) {
		throw error;
	}
}
