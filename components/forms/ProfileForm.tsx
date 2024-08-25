"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ProfileSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

type Props = {
	clerkId: string;
	user: string;
};

const ProfileForm = ({ clerkId, user }: Props) => {
	const parsedUser = JSON.parse(user);
	const router = useRouter();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			username: parsedUser.username || "",
			name: parsedUser.name || "",
			portfolioUrl: parsedUser.portfolioWebsite || "",
			location: parsedUser.location || "",
			bio: parsedUser.bio || "",
		},
	});
	async function onSubmit(values: z.infer<typeof ProfileSchema>) {
		try {
			//update user
			await updateUser({
				clerkId,
				path: `/profile/${values.username}`,
				updateData: {
					username: values.username,
					name: values.name,
					portfolioWebsite: values.portfolioUrl,
					location: values.location,
					bio: values.bio,
				},
			});
			router.push(`/profile/${values.username}`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-9 flex w-full flex-col gap-9"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark300_light700">
								Name <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Your name"
									{...field}
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark300_light700">
								Username{" "}
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Your username"
									{...field}
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="portfolioUrl"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark300_light700">
								Portfolio Link
							</FormLabel>
							<FormControl>
								<Input
									type="url"
									placeholder="Your portfolio URL"
									{...field}
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark300_light700">
								Location
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Where are you from?"
									{...field}
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="text-dark300_light700">
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="What's special about you?"
									{...field}
									className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-7 flex justify-end">
					<Button
						type="submit"
						className="primary-gradient w-fit text-white"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProfileForm;
