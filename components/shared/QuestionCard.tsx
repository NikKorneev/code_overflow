import React from "react";
import RenderTag from "./RenderTag";
import Image from "next/image";

type VoteProps = {
	icon: string;
	title: string;
	voteCount: number;
};
const RenderVote = ({ icon, title, voteCount }: VoteProps) => {
	return (
		<div className="flex items-center gap-1">
			<div>
				<Image
					src={icon}
					alt={title}
					width={16}
					height={16}
					className="fill-accent-blue *:stroke-accent-blue"
				/>
			</div>
			<p className="text-dark400_light700">
				<span className="font-semibold">
					{voteCount >= 1000
						? `${(voteCount / 1000).toFixed(1)}k`
						: voteCount}
				</span>{" "}
				{title}
			</p>
		</div>
	);
};

const QuestionCard = () => {
	return (
		<div className="background-light900_dark300 rounded-lg border border-light-400/10 px-11 py-9 dark:border-dark-200">
			<h3 className="h3-bold text-dark200_light800 line-clamp-4 md:line-clamp-2">
				The Lightning Component c:LWC_PizzaTracker generated invalid
				output for field status. Error How to solve this
			</h3>

			<div className="mt-3 flex flex-wrap gap-2">
				<RenderTag title={"invalid fields"} id={1} />
				<RenderTag title={"invalid fields"} id={2} />
				<RenderTag title={"invalid fields"} id={3} />
			</div>

			<div className="mt-6 flex flex-wrap justify-between gap-2">
				<div className="flex items-center gap-1">
					<div>
						<Image
							src="/assets/images/default-logo.svg"
							alt="user logo"
							width={20}
							height={20}
							className="rounded-full"
						/>
					</div>
					<p className="text-dark200_light800 font-semibold">
						Satheesh
					</p>
					<div className="text-dark400_light700 text-sm">•</div>
					<p className="text-dark400_light700 text-sm">
						{" "}
						asked 2 mins ago
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					<RenderVote
						title={"Votes"}
						icon={"/assets/icons/like.svg"}
						voteCount={1250}
					/>
					<RenderVote
						title={"Answers"}
						icon={"/assets/icons/message.svg"}
						voteCount={900}
					/>
					<RenderVote
						title={"Views"}
						icon={"/assets/icons/eye.svg"}
						voteCount={5200}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
