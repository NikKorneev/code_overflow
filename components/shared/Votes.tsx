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
import { useEffect, useOptimistic, useState } from "react";
import { toast } from "../ui/use-toast";

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
	const [isOptimisticUpvoted, setIsOptimisticUpvoted] = useOptimistic<
		boolean,
		boolean
	>(hasUpvoted, (state, value) => value);
	const [optimisticUpvotes, setOptimisticUpvotes] = useOptimistic<
		number,
		number
	>(upvotes, (state, value) => value);
	const [optimisticDownvotes, setOptimisticDownvotes] = useOptimistic<
		number,
		number
	>(downvotes, (state, value) => value);

	const [isOptimisticDownvoted, setIsOptimisticDownvoted] = useOptimistic<
		boolean,
		boolean
	>(hasDownvoted, (state, value) => value);

	const [isOptimisticSaved, setIsOptimisticSaved] = useOptimistic<
		boolean,
		boolean
	>(!!hasSaved, (state, value) => value);

	const handleVote = async (voteType: "upvote" | "downvote") => {
		if (!userId) {
			return toast({
				title: "Sign in required",
				description: "You must be logged in to perform this action",
				variant: "destructive",
			});
		}

		setIsSubmitting(true);
		if (voteType === "upvote" && type === "question") {
			setIsOptimisticUpvoted(hasUpvoted ? false : true);
			setIsOptimisticDownvoted(false);
			setOptimisticUpvotes(hasUpvoted ? upvotes - 1 : upvotes + 1);
			setOptimisticDownvotes(hasDownvoted ? downvotes - 1 : downvotes);
			await upvoteQuestion({
				hasupVoted: hasUpvoted,
				path: `/question/${targetId}`,
				questionId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasdownVoted: hasDownvoted,
			});

			toast({
				title: hasUpvoted ? "Question unvoted" : "Question upvoted",
				variant: "default",
			});
		} else if (voteType === "downvote" && type === "question") {
			setIsOptimisticDownvoted(hasDownvoted ? false : true);
			setIsOptimisticUpvoted(false);
			setOptimisticDownvotes(
				hasDownvoted ? downvotes - 1 : downvotes + 1
			);
			setOptimisticUpvotes(hasUpvoted ? upvotes - 1 : upvotes);
			await downvoteQuestion({
				questionId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasdownVoted: hasDownvoted,
				path: `/question/${targetId}`,
				hasupVoted: hasUpvoted,
			});
			toast({
				title: hasDownvoted ? "Question unvoted" : "Question downvoted",
				variant: "destructive",
			});
		} else if (voteType === "upvote" && type === "answer") {
			setIsOptimisticUpvoted(hasUpvoted ? false : true);
			setIsOptimisticDownvoted(false);
			setOptimisticUpvotes(hasUpvoted ? upvotes - 1 : upvotes + 1);
			setOptimisticDownvotes(hasDownvoted ? downvotes - 1 : downvotes);
			await upvoteAnswer({
				answerId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasupVoted: hasUpvoted,
				path: `/question/${targetId}`,
				hasdownVoted: hasDownvoted,
			});
			toast({
				title: hasUpvoted ? "Answer unvoted" : "Answer upvoted",
				variant: "default",
			});
		} else if (voteType === "downvote" && type === "answer") {
			setIsOptimisticDownvoted(hasDownvoted ? false : true);
			setIsOptimisticUpvoted(false);
			setOptimisticDownvotes(
				hasDownvoted ? downvotes - 1 : downvotes + 1
			);
			setOptimisticUpvotes(hasUpvoted ? upvotes - 1 : upvotes);
			await downvoteAnswer({
				answerId: JSON.parse(targetId),
				userId: JSON.parse(userId),
				hasdownVoted: hasDownvoted,
				path: `/question/${targetId}`,
				hasupVoted: hasUpvoted,
			});
			toast({
				title: hasDownvoted ? "Answer unvoted" : "Answer downvoted",
				variant: "destructive",
			});
		}
		setIsSubmitting(false);
	};

	const handleSave = async () => {
		if (!userId) {
			return toast({
				title: "Sign in required",
				description: "You must be logged in to perform this action",
				variant: "destructive",
			});
		}

		setIsSubmitting(true);
		setIsOptimisticSaved(hasSaved ? false : true);
		await saveQuestion({
			hasSaved: hasSaved!,
			path: `/question/${targetId}`,
			questionId: JSON.parse(targetId),
			userId: JSON.parse(userId),
		});
		toast({
			title: hasSaved ? "Question removed from saved" : "Question saved",
			variant: hasSaved ? "destructive" : "default",
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
							isOptimisticUpvoted
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
							{getCountToString(optimisticUpvotes)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex-center gap-2.5">
				<div className="flex-center gap-1.5">
					<Image
						src={
							isOptimisticDownvoted
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
							{getCountToString(optimisticDownvotes)}
						</p>
					</div>
				</div>
			</div>
			{type === "question" && (
				<Image
					src={
						isOptimisticSaved
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
