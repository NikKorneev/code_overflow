import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "./cards/QuestionCard";
import Pagination from "./Pagination";

type Props = {
	userId: string;
	searchParams?: Record<string, string | undefined>;
	clerkId: string;
};

const QuestionTab = async ({ userId, searchParams, clerkId }: Props) => {
	const { questions, isNext } = await getUserQuestions({
		userId,
		page: searchParams?.userQuestionsPage
			? +searchParams?.userQuestionsPage
			: 1,
		pageSize: 10,
	});

	return (
		<>
			<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
				{questions.length > 0 &&
					questions.map((question) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							answers={question.answers}
							author={question.author}
							createdAt={question.createdAt}
							tags={question.tags}
							title={question.title}
							clerkId={clerkId}
							upvotes={question.upvotes}
							views={question.views}
						/>
					))}
			</div>
			<div className="mt-5">
				<Pagination
					type="userQuestionsPage"
					pageNumber={
						searchParams?.userQuestionsPage
							? +searchParams?.userQuestionsPage
							: 1
					}
					isNext={isNext}
				/>
			</div>
		</>
	);
};

export default QuestionTab;
