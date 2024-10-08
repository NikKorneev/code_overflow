import { z } from "zod";

export const questionsSchema = z.object({
	title: z
		.string()
		.min(5, { message: "Title must be at least 5 characters" })
		.max(130, { message: "Title must be less than 130 characters" }),
	explanation: z.string().min(20),
	tags: z
		.array(z.string().min(1).max(15))
		.min(1, {
			message: "Add one more tag",
		})
		.max(3, {
			message: "You can add only 3 tags",
		}),
});

export const AnswerSchema = z.object({
	answer: z.string().min(20),
});

export const ProfileSchema = z.object({
	name: z.string().min(3).max(50),
	username: z.string().min(5).max(50),
	bio: z.string().min(5).max(150).optional().or(z.literal("")),
	portfolioUrl: z.string().url().optional().or(z.literal("")),
	location: z.string().max(50).optional(),
});
