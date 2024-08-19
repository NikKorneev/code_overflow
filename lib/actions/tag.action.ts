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
import console from "console";
import { escapeRegExp } from "../utils";

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

		const query: FilterQuery<typeof Tag> = {};

		if (searchQuery) {
			query.$or = [
				{
					name: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
				{
					description: {
						$regex: new RegExp(escapeRegExp(searchQuery), "i"),
					},
				},
			];
		}

		let sortOptions = {};

		switch (filter) {
			case "popular":
				sortOptions = {
					questions: -1,
				};
				break;
			case "recent":
				sortOptions = {
					createdAt: -1,
				};
				break;
			case "name":
				sortOptions = {
					name: 1,
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

		const tags = (await Tag.find(query).sort(sortOptions)) as TagType[];

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

		const tag = await Tag.findOne(tagFilter).populate({
			path: "questions",
			model: Question,
			match: query,
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

export async function getHotTags() {
	try {
		connectToDatabase();

		const hotTags = await Tag.aggregate([
			{
				$project: {
					name: 1,
					numberOfQuestions: { $size: "$questions" },
				},
			},
			{ $sort: { numberOfQuestions: -1 } },
			{ $limit: 5 },
		]);

		return { hotTags: hotTags || [] };
	} catch (error) {
		console.log(error);

		return { hotTags: [] };
	}
}
