"use server";

import User from "@/db/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/db/tag.model";
import { Tag as TagType } from "@/types";

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
		connectToDatabase();

		const tags = (await Tag.find({}).sort({ createdAt: -1 })) as TagType[];

		return { tags };
	} catch (error) {
		throw error;
	}
}
