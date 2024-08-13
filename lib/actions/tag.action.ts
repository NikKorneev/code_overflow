"use server";

import User from "@/db/user.model";
import { connectToDatabase } from "../mongoose";
import {
	GetAllTagsParams,
	GetQuestionsByTagIdParams,
	GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/db/tag.model";
import { Tag as TagType, Question as QuestionType } from "@/types";
import Question from "@/db/question.model";
import { FilterQuery } from "mongoose";
import { redirect } from "next/navigation";

export async function getUserTags({
	userId,
	limit,
}: GetTopInteractedTagsParams) {
	try {
		connectToDatabase();

		const user = await User.findById(userId);

		if (!user) throw new Error("User not found");

		// interaction

		return [
			{
				_id: "tag1",
				name: "tag1",
			},
			{
				_id: "tag2",
				name: "tag2",
			},
			{
				_id: "tag3",
				name: "tag3",
			},
		];
	} catch (error) {
		throw error;
	}
}

export async function getAllTags({
	filter,
	page,
	pageSize,
	searchQuery,
}: GetAllTagsParams) {
	try {
		await connectToDatabase();

		const tags = (await Tag.find({}).sort({ createdAt: -1 })) as TagType[];

		return { tags };
	} catch (error) {
		throw error;
	}
}

export async function getQuestionsByTagId({
	tagId,
	page,
	pageSize,
	searchQuery,
}: GetQuestionsByTagIdParams) {
	try {
		await connectToDatabase();

		const tagFilter: FilterQuery<ITag> = { _id: tagId };

		const tag = await Tag.findOne(tagFilter).populate({
			path: "questions",
			model: Question,
			match: searchQuery
				? { name: { $regex: new RegExp(searchQuery, "i") } }
				: {},
			populate: [
				{
					path: "author",
					model: User,
					select: "_id clerkId name picture",
				},
				{ path: "tags", model: Tag, select: "_id name" },
			],
		});

		if (!tag) throw new Error("Tag not found");

		return {
			tagTitle: tag.name,
			questions: tag.questions as QuestionType[],
		};
	} catch (error) {
		console.log(error);
		redirect("/not-found");
	}
}
