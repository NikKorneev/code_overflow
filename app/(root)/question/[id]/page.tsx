import AnswerForm from "@/components/forms/AnswerForm";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Params = {
	params: {
		id: string;
	};
};

const Page = async ({ params }: Params) => {
	const question = await getQuestionById({ questionId: params.id });

	return (
		<>
			<div className="flex-start w-full flex-col">
				<div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
					<Link
						href={`/profile/${question.author._id}`}
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

					<div className="flex justify-end">VOTING</div>
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

			<AnswerForm />
		</>
	);
};

export default Page;
