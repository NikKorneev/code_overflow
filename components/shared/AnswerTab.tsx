import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "./cards/AnswerCard";
import { auth } from "@clerk/nextjs/server";
import Pagination from "./Pagination";

type Props = {
	userId: string;
	searchParams?: Record<string, string | undefined>;
	clerkId: string;
};

const AnswerTab = async ({ userId, searchParams, clerkId }: Props) => {
	const { answers, isNext } = await getUserAnswers({
		userId: userId,
		page: searchParams?.userAnswersPage
			? +searchParams?.userAnswersPage
			: 1,
		pageSize: 10,
	});
	const { userId: currentUserId } = auth();

	return (
		<>
			{answers.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2">
					{answers.map((answer) => (
						<AnswerCard
							currentUserId={currentUserId!}
							clerkId={clerkId}
							key={answer._id}
							questionId={answer.question._id}
							answerId={answer._id}
							title={answer.question.title}
							upvotes={answer.upvotes.length || 0}
							createdAt={answer.createdAt}
						/>
					))}
				</div>
			)}
			<div className="mt-5">
				<Pagination
					type="userAnswersPage"
					pageNumber={
						searchParams?.userAnswersPage
							? +searchParams?.userAnswersPage
							: 1
					}
					isNext={isNext}
				/>
			</div>
		</>
	);
};

export default AnswerTab;
