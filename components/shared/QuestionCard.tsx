import React from "react";
import RenderTag from "./RenderTag";
import Image from "next/image";
import { Question } from "@/types";
import Link from "next/link";
import Metric from "./Metric";
import { getTimestamp } from "@/lib/utils";

const QuestionCard = (props: Question) => {
	return (
		<div className="card-wrapper">
			<div className="md:hidden">
				<p className="text-dark400_light700 mb-2 text-sm ">
					{getTimestamp(props.createdAt)}
				</p>
			</div>
			<Link href={`/question/${props.id}`}>
				<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-4 md:line-clamp-2">
					{props.title}
				</h3>
			</Link>

			<div className="mt-3 flex flex-wrap gap-2">
				{props.tags.map((tag) => (
					<RenderTag title={tag.title} id={tag.id} key={tag.id} />
				))}
			</div>

			<div className="mt-6 flex flex-wrap justify-between gap-2">
				<div className="flex  items-end gap-1">
					<Metric
						alt="author's image"
						icon="/assets/images/default-logo.svg"
						title={getTimestamp(props.createdAt)}
						value={`${props.author.name} •`}
						href={`/profile/${props.author.id}`}
						isAuthor
						textStyles="small-medium lg:text-base text-dark400_light800"
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					<Metric
						title={"Votes"}
						icon={"/assets/icons/like.svg"}
						value={props.upvotes}
						alt="Votes icon"
						textStyles="body-medium lg:text-base text-dark400_light700"
					/>
					<Metric
						title={"Answers"}
						icon={"/assets/icons/message.svg"}
						value={props.answers.length}
						alt="Answers icon"
						textStyles="small-medium lg:text-base text-dark400_light800"
					/>
					<Metric
						title={"Views"}
						icon={"/assets/icons/eye.svg"}
						value={props.views}
						alt="Views icon"
						textStyles="small-medium lg:text-base text-dark400_light800"
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
