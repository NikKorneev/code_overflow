"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
	downvoteQuestion,
	upvoteQuestion,
} from "@/lib/actions/question.action";
import { saveQuestion } from "@/lib/actions/user.action";
import { getCountToString } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type VotesProps = {
	type: "question" | "answer";
	targetId: string;
	userId: string;
	upvotes: number;
	hasUpvoted: boolean;
	downvotes: number;
	hasDownvoted: boolean;
	hasSaved?: boolean;
};
const Votes = ({
	downvotes,
	hasDownvoted,
	hasUpvoted,
	targetId,
	type,
	upvotes,
	hasSaved,
	userId,
}: VotesProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const handleVote = async (voteType: "upvote" | "downvote") => {
		if (!userId) {
			router.push("/sign-in");
			return;
		}

		setIsSubmitting(true);
		if (voteType === "upvote" && type === "question") {
			await upvoteQuestion({
				hasupVoted: hasUpvoted,
				path: `/question/${targetId}`,
				questionId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasdownVoted: hasDownvoted,
			});
		} else if (voteType === "downvote" && type === "question") {
			await downvoteQuestion({
				questionId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasdownVoted: hasDownvoted,
				path: `/question/${targetId}`,
				hasupVoted: hasUpvoted,
			});
		} else if (voteType === "upvote" && type === "answer") {
			await upvoteAnswer({
				answerId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasupVoted: hasUpvoted,
				path: `/question/${targetId}`,
				hasdownVoted: hasDownvoted,
			});
		} else if (voteType === "downvote" && type === "answer") {
			await downvoteAnswer({
				answerId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasdownVoted: hasDownvoted,
				path: `/question/${targetId}`,
				hasupVoted: hasUpvoted,
			});
		}
		setIsSubmitting(false);
	};

	const handleSave = async () => {
		if (!userId) {
			router.push("/sign-in");
			return;
		}

		setIsSubmitting(true);
		await saveQuestion({
			hasSaved: hasSaved!,
			path: `/question/${targetId}`,
			questionId: JSON.parse(targetId),
			userId: JSON.parse(userId),
		});
		setIsSubmitting(false);
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (type === "question") {
			clearTimeout(timer!);

			timer = setTimeout(() => {
				viewQuestion({
					questionId: JSON.parse(targetId),
					userId: userId ? JSON.parse(userId) : undefined,
				});
			}, 5000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [userId, targetId]);

	return (
		<div className="flex gap-5">
			<div className="flex-center gap-2.5">
				<div className="flex-center gap-1.5">
					<Image
						src={
							hasUpvoted
								? "/assets/icons/upvoted.svg"
								: "/assets/icons/upvote.svg"
						}
						alt="upvote"
						className="cursor-pointer"
						width={18}
						height={18}
						onClick={() => {
							if (isSubmitting) return;
							handleVote("upvote");
						}}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{getCountToString(upvotes)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex-center gap-2.5">
				<div className="flex-center gap-1.5">
					<Image
						src={
							hasDownvoted
								? "/assets/icons/downvoted.svg"
								: "/assets/icons/downvote.svg"
						}
						alt="downvote"
						className="cursor-pointer"
						width={18}
						height={18}
						onClick={() => {
							if (isSubmitting) return;
							handleVote("downvote");
						}}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{getCountToString(downvotes)}
						</p>
					</div>
				</div>
			</div>
			{type === "question" && (
				<Image
					src={
						hasSaved
							? "/assets/icons/star-filled.svg"
							: "/assets/icons/star-red.svg"
					}
					alt="favorite"
					className="cursor-pointer"
					width={18}
					height={18}
					onClick={() => {
						if (isSubmitting) return;
						handleSave();
					}}
				/>
			)}
		</div>
	);
};

export default Votes;
