import { AnswerFilters } from "@/constants/filters";
import Filters from "./Filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Image from "next/image";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "./EditDeleteAction";
import { auth } from "@clerk/nextjs/server";

type Props = {
	questionId: string;
	totalAnswers: number;
	userId: string;
	page: number | string;
	filter?: string;
	questionClerkId?: string;
};
const AllAnswers = async ({
	questionId,
	totalAnswers,
	userId,
	filter,
	questionClerkId,
	page,
}: Props) => {
	const { userId: curClerkId } = auth();
	const { results } = await getAnswers({
		questionId,
		page: page ? +page : 1,
		sortBy: filter,
	});
	const showActionButtons = questionClerkId === curClerkId;

	return (
		<div className="mt-11">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-primary-500">
					{totalAnswers} Answer{totalAnswers !== 1 ? "s" : ""}
				</h3>
				<Filters filters={AnswerFilters} />
			</div>
			<div className="mb-6">
				{results.length > 0 &&
					results.map((answer) => (
						<article
							key={answer._id}
							className="light-border card-wrapper border-b py-10"
						>
							<div className="flex items-center justify-between">
								<div className="mb-4 flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
									<Link
										href={`/profile/${answer.author.username}`}
										className="flex flex-1 items-start gap-1 sm:items-center"
									>
										<Image
											src={answer.author.picture}
											alt="author's image"
											className="rounded-full object-cover max-sm:mt-0.5"
											width={25}
											height={25}
										/>
										<div className="flex flex-col sm:flex-row sm:items-center">
											<p className="body-semibold text-dark300_light700">
												{answer.author.name}
											</p>
											<p className="small-regular text-dark400_light500 ml-0.5 mt-0.5 line-clamp-1">
												<span>
													<span className="max-sm:hidden">
														{" "}
														- answered{" "}
													</span>
													{getTimestamp(
														answer.createdAt
													)}
												</span>
											</p>
										</div>
									</Link>
									<div className="flex gap-2">
										<Votes
											downvotes={answer.downvotes.length}
											upvotes={answer.upvotes.length}
											hasDownvoted={
												userId
													? answer.downvotes.includes(
															JSON.parse(userId)
													  )
													: false
											}
											hasUpvoted={
												userId
													? answer.upvotes.includes(
															JSON.parse(userId)
													  )
													: false
											}
											targetId={JSON.stringify(
												answer._id
											)}
											type="answer"
											userId={userId}
										/>
										<SignedIn>
											{showActionButtons && (
												<EditDeleteAction
													type="Answer"
													itemId={JSON.stringify(
														answer._id
													)}
												/>
											)}
										</SignedIn>
									</div>
								</div>
							</div>
							<ParseHTML data={answer.content} />
						</article>
					))}
			</div>
		</div>
	);
};

export default AllAnswers;
