import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "./cards/AnswerCard";

type Props = {
	userId: string;
	searchParams?: Record<string, string | undefined>;
};

const AnswerTab = async ({ userId, searchParams }: Props) => {
	const { answers } = await getUserAnswers({ userId: userId, page: 1 });

	return (
		<>
			{answers.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2">
					{answers.map((answer) => (
						<AnswerCard
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
		</>
	);
};

export default AnswerTab;
