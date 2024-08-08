import React from "react";
import { Question } from "@/types";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import RenderTag from "../RenderTag";
import Metric from "../Metric";

const QuestionCard = (props: Question) => {
	return (
		<div className="card-wrapper">
			<div className="md:hidden">
				<p className="text-dark400_light700 mb-2 text-sm ">
					{getTimestamp(props.createdAt)}
				</p>
			</div>
			<Link href={`/question/${props._id}`}>
				<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-4 md:line-clamp-2">
					{props.title}
				</h3>
			</Link>

			<div className="mt-3 flex flex-wrap gap-2">
				{props.tags.map((tag) => (
					<RenderTag title={tag.name} _id={tag._id} key={tag._id} />
				))}
			</div>

			<div className="mt-6 flex flex-wrap justify-between gap-2">
				<div className="flex  items-end gap-1">
					<Metric
						alt="author's image"
						icon={
							props.author.picture ||
							"/assets/images/default-logo.svg"
						}
						title={getTimestamp(props.createdAt)}
						value={`${props.author.name} •`}
						href={`/profile/${props.author?.username}`}
						isAuthor
						textStyles="small-medium lg:text-base text-dark400_light800"
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					<Metric
						title={"Votes"}
						icon={"/assets/icons/like.svg"}
						value={props.upvotes || 0}
						alt="Votes icon"
						textStyles="body-medium lg:text-base text-dark400_light700"
					/>
					<Metric
						title={"Answers"}
						icon={"/assets/icons/message.svg"}
						value={props.answers.length || 0}
						alt="Answers icon"
						textStyles="small-medium lg:text-base text-dark400_light800"
					/>
					<Metric
						title={"Views"}
						icon={"/assets/icons/eye.svg"}
						value={props.views || 0}
						alt="Views icon"
						textStyles="small-medium lg:text-base text-dark400_light800"
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
