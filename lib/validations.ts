import { z } from "zod";

export const questionsSchema = z.object({
	title: z
		.string()
		.min(5, { message: "Title must be at least 5 characters" })
		.max(130, { message: "Title must be less than 130 characters" }),
	explanation: z.string().min(20),
	tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
