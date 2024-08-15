import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: ParamsProps) => {
	const { userId } = auth();
	const question = await getQuestionById({ questionId: params.id });
	const curUser = userId ? await getUserById({ userId }) : null;

	if (!curUser || question.author.clerkId !== userId) {
		redirect(`/question/${question._id}`);
	}

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Edit Question</h1>

			<div className="mt-9">
				<QuestionForm
					type="edit"
					mongoUserId={JSON.stringify(curUser._id)}
					questionDetails={JSON.stringify(question)}
				/>
			</div>
		</>
	);
};

export default Page;
