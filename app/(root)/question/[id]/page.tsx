import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import EditDeleteAction from "@/components/shared/EditDeleteAction";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Params = {
	params: {
		id: string;
	};
};

const Page = async ({ params, searchParams }: URLProps) => {
	const question = await getQuestionById({ questionId: params.id });
	const { userId } = auth();

	let mongoUser;

	if (userId) {
		mongoUser = await getUserById({ userId });
	}

	return (
		<>
			<div className="flex-start w-full flex-col">
				<div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
					<Link
						href={`/profile/${question.author.username}`}
						className="flex items-center justify-start gap-1"
					>
						<Image
							src={question.author.picture}
							alt="author's image"
							className="rounded-full"
							width={22}
							height={22}
						/>
						<p className="paragraph-semibold text-dark300_light700">
							{question.author.name}
						</p>
					</Link>

					<div className="flex justify-end ">
						<Votes
							type="question"
							targetId={JSON.stringify(question._id)}
							userId={JSON.stringify(mongoUser?._id)}
							upvotes={question.upvotes.length}
							hasUpvoted={question.upvotes.includes(
								mongoUser?._id
							)}
							downvotes={question.downvotes.length}
							hasDownvoted={question.downvotes.includes(
								mongoUser?._id
							)}
							hasSaved={mongoUser?.saved.includes(question._id)}
						/>
					</div>
				</div>
				<h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
					{question.title}
				</h2>
			</div>

			<div className="mb-8 mt-5 flex flex-wrap gap-4">
				<Metric
					title={`asked ${getTimestamp(question.createdAt)}`}
					icon={"/assets/icons/clock.svg"}
					value={``}
					alt="Clock icon"
					textStyles="small-medium lg:text-base text-dark400_light800"
				/>
				<Metric
					title={"Answers"}
					icon={"/assets/icons/message.svg"}
					value={question.answers.length || 0}
					alt="Answers icon"
					textStyles="small-medium lg:text-base text-dark400_light800"
				/>
				<Metric
					title={"Views"}
					icon={"/assets/icons/eye.svg"}
					value={question.views || 0}
					alt="Views icon"
					textStyles="small-medium lg:text-base text-dark400_light800"
				/>
			</div>

			<ParseHTML data={question.content} />

			<div className="mt-8 flex flex-wrap gap-2">
				{question.tags.map((tag) => (
					<RenderTag
						key={tag._id}
						title={tag.name}
						_id={tag._id}
						showCount={false}
					/>
				))}
			</div>

			<AllAnswers
				questionId={question._id}
				totalAnswers={question.answers.length}
				userId={JSON.stringify(mongoUser?._id)}
				questionClerkId={question.author.clerkId}
				filter={searchParams?.filter}
				page={searchParams?.page || 1}
			/>

			<AnswerForm
				questionId={JSON.stringify(question._id)}
				authorId={JSON.stringify(mongoUser?._id)}
				question={question?.content}
			/>
		</>
	);
};

export default Page;
