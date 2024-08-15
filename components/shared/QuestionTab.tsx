import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "./cards/QuestionCard";

type Props = {
	userId: string;
	searchParams?: Record<string, string | undefined>;
	clerkId: string;
};

const QuestionTab = async ({ userId, searchParams, clerkId }: Props) => {
	const { questions } = await getUserQuestions({ userId, page: 1 });

	return (
		<div className="grid grid-cols-1 md:grid-cols-2">
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
	);
};

export default QuestionTab;
