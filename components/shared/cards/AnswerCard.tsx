import { getTimestamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Metric from "../Metric";
import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

type Props = {
	createdAt: Date;
	questionId: string;
	answerId: string;
	title: string;
	upvotes: number;
	currentUserId: string;
	clerkId: string;
};

const AnswerCard = (props: Props) => {
	const showActionButtons =
		props.clerkId && props.clerkId === props.currentUserId;

	return (
		<Link href={`/question/${props.questionId}/#${props.answerId}`}>
			<div className="card-wrapper">
				<div>
					<p className="text-dark400_light700 mb-2 text-sm ">
						Answered {getTimestamp(props.createdAt)} in
					</p>
				</div>
				<div className="flex flex-row justify-between">
					<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-4 md:line-clamp-2">
						{props.title}
					</h3>

					<SignedIn>
						{showActionButtons && (
							<EditDeleteAction
								type="Answer"
								itemId={JSON.stringify(props.answerId)}
							/>
						)}
					</SignedIn>
				</div>

				<div className="mt-6 flex flex-wrap justify-between gap-2">
					<div className="flex flex-wrap gap-2">
						<Metric
							title={"Upvotes"}
							icon={"/assets/icons/like.svg"}
							value={props.upvotes || 0}
							alt="Votes icon"
							textStyles="body-medium lg:text-base text-dark400_light700"
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default AnswerCard;
