"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { AnswerSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname, useRouter } from "next/navigation";

type Props = {
	question: string;
	questionId: string;
	authorId: string;
};

const AnswerForm = ({ question, questionId, authorId }: Props) => {
	const pathname = usePathname();
	const editorRef = useRef(null);
	const themeContext = useTheme();
	const router = useRouter();
	const [isSubmittingAi, setIsSubmittingAi] = useState(false);
	const form = useForm<z.infer<typeof AnswerSchema>>({
		resolver: zodResolver(AnswerSchema),
		defaultValues: {
			answer: "",
		},
	});

	const handleCreateAnswer = async (data: z.infer<typeof AnswerSchema>) => {
		if (!authorId) router.push("/sign-in");

		try {
			await createAnswer({
				content: data.answer,
				author: JSON.parse(authorId),
				question: JSON.parse(questionId),
				path: pathname,
			});

			form.reset();

			if (editorRef.current) {
				(editorRef.current as any).setContent("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
				<h4 className="paragraph-semibold text-dark400_light800">
					Write your answer here
				</h4>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCreateAnswer)}
					className="mt-6 flex w-full flex-col gap-10"
				>
					<FormField
						control={form.control}
						name="answer"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col gap-3">
								<FormControl className="mt-3.5">
									<Editor
										apiKey={
											process.env
												.NEXT_PUBLIC_TINY_EDITOR_API_KEY
										}
										onInit={(_evt, editor) => {
											// @ts-ignore
											editorRef.current = editor;
										}}
										onEditorChange={(content) =>
											field.onChange(content)
										}
										init={{
											height: 350,
											menubar: false,
											content_css:
												themeContext.mode === `dark`
													? "dark"
													: "light", // Use TinyMCE's built-in dark theme
											skin:
												themeContext.mode === `dark`
													? "oxide-dark"
													: "oxide",
											plugins: [
												"advlist",
												"autolink",
												"lists",
												"link",
												"image",
												"charmap",
												"preview",
												"anchor",
												"searchreplace",
												"visualblocks",
												"fullscreen",
												"insertdatetime",
												"media",
												"table",
												"codesample",
											],
											toolbar:
												"undo redo | blocks | " +
												"codesample | bold italic forecolor | alignleft aligncenter " +
												"alignright alignjustify | bullist ",
											content_style:
												"body { font-family:Inter,sans-serif; font-size:16px; }",
										}}
									/>
								</FormControl>

								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>

					<div className="flex justify-end">
						<Button
							type="submit"
							className="primary-gradient w-fit text-white"
							disabled={
								form.formState.isSubmitting || isSubmittingAi
							}
						>
							{form.formState.isSubmitting
								? "Submitting..."
								: "Submit answer"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AnswerForm;
