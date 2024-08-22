"use server";

import Question from "@/db/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/db/answer.model";
import User from "@/db/user.model";
import Tag from "@/db/tag.model";

const searchableTypes = ["question", "answer", "user", "tag"];

export async function searchGlobally({ query, type }: SearchParams) {
	try {
		await connectToDatabase();

		const regex = { $regex: query, $options: "i" };

		let results = [];

		const modelsAndTypes = [
			{
				model: Question,
				searchField: "title",
				type: "question",
			},
			{
				model: User,
				searchField: "username",
				type: "user",
			},
			{
				model: Answer,
				searchField: "content",
				type: "answer",
			},
			{
				model: Tag,
				searchField: "name",
				type: "tag",
			},
		];

		const typeLower = type?.toLowerCase();

		if (!typeLower || !searchableTypes.includes(typeLower)) {
			//search global
			for (const { model, searchField, type } of modelsAndTypes) {
				const queryResults = await model
					.find({ [searchField]: regex })
					.limit(2);

				results.push(
					...queryResults.map((item) => ({
						title:
							type === "answer"
								? `Answers containing ${query}`
								: item[searchField],
						type,
						id:
							type === "user"
								? item.clerkId
								: type === "answer"
								? item.question
								: item._id,
						username: type === "user" ? item.username : null,
					}))
				);
			}
		} else {
			//search in model

			const modelInfo = modelsAndTypes.find((item) => item.type === type);

			if (!modelInfo) {
				throw new Error("Model not found");
			}

			const model = modelInfo.model;
			const queryResults = await model
				.find({ [modelInfo.searchField]: regex })
				.limit(8);

			results = queryResults.map((item) => ({
				title:
					type === "answer"
						? `Answers containing ${query}`
						: item[modelInfo.searchField],
				type,
				id:
					type === "user"
						? item.clerkId
						: type === "answer"
						? item.question
						: item._id,
				username: type === "user" ? item.username : null,
			}));
		}
		return JSON.stringify(results);
	} catch (error) {
		console.log("Error with global search", error);
		throw error;
	}
}
