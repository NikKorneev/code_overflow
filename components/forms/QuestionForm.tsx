"use client";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { questionsSchema } from "@/lib/validations";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { type } from "os";

const QuestionForm = () => {
	const editorRef = useRef<null>(null);
	const themeContext = useTheme();

	const form = useForm<z.infer<typeof questionsSchema>>({
		resolver: zodResolver(questionsSchema),
		defaultValues: {
			title: "",
			explanation: "",
			tags: [],
		},
	});

	const { isSubmitting } = form.formState;

	function onSubmit(values: z.infer<typeof questionsSchema>) {
		console.log(values);
		try {
			//make an async to API -> create a question
			//contain all form data
			//navigate to home page
		} catch (error) {}
	}

	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: ControllerRenderProps<
			{
				title: string;
				explanation: string;
				tags: string[];
			},
			"tags"
		>
	) => {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();

			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim();

			if (tagValue !== "") {
				if (tagValue.length > 15) {
					return form.setError("tags", {
						type: "required",
						message: "Tag must be less than 15 characters",
					});
				}

				if (!form.getValues().tags?.includes(tagValue as never)) {
					form.setValue("tags", [
						...form.getValues()?.tags,
						tagValue,
					]);
					tagInput.value = "";
					form.clearErrors("tags");
				} else {
					return form.setError("tags", {
						type: "required",
						message: "Tag already contains in the list",
					});
				}
			}
		}
	};

	const handleDelete = (str: string) => {
		form.setValue(
			"tags",
			form.getValues().tags?.filter((tag) => tag !== str)
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-10"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800 ">
								Question Title{" "}
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									{...field}
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Be specific and imagine you&apos;re asking a
								question to another person.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				{themeContext.mode === "dark" && (
					<FormField
						control={form.control}
						name="explanation"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col gap-3">
								<FormLabel className="paragraph-semibold text-dark400_light800 ">
									Detailed explanation of your problem
									<span className="text-primary-500">*</span>
								</FormLabel>
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
										initialValue=""
										init={{
											height: 350,
											menubar: false,
											content_css: `dark`, // Use TinyMCE's built-in dark theme
											skin: "oxide-dark",
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
								<FormDescription className="body-regular mt-2.5 text-light-500">
									Introduce the problem and expand on what you
									put in the title. Minimum 20 characters.
								</FormDescription>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
				)}
				{themeContext.mode !== "dark" && (
					<FormField
						control={form.control}
						name="explanation"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col gap-3">
								<FormLabel className="paragraph-semibold text-dark400_light800 ">
									Detailed explanation of your problem
									<span className="text-primary-500">*</span>
								</FormLabel>
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
										initialValue=""
										init={{
											height: 350,
											menubar: false,
											content_css: `light`, // Use TinyMCE's built-in dark theme
											skin: "oxide",
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
								<FormDescription className="body-regular mt-2.5 text-light-500">
									Introduce the problem and expand on what you
									put in the title. Minimum 20 characters.
								</FormDescription>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800 ">
								Tags <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									onKeyDown={(e) =>
										handleInputKeyDown(e, field)
									}
									placeholder="Add tags..."
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
								/>
							</FormControl>
							{form.getValues().tags?.length > 0 && (
								<div className="flex-start mt-2.5 flex gap-2.5">
									{form.getValues().tags?.map((tag) => (
										<Badge
											key={tag}
											className="subtle-medium background-light800_dark300 text-light400_light500 cursor-pointer rounded-md border-none px-4 py-2 capitalize"
											onClick={() => handleDelete(tag)}
										>
											<p>{tag}</p>
										</Badge>
									))}
								</div>
							)}
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Add up to 3 tags to describe what your question
								is about. You need to press Enter after each
								tag.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="primary-gradient w-fit !text-light-900 "
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<>{type === "edit" ? "Editing..." : "Posting..."}</>
					) : (
						<>
							{type === "edit"
								? "Edit Question"
								: "Ask a Question"}
						</>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default QuestionForm;
