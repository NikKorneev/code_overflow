import Filters from "@/components/shared/Filters";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import React from "react";
import NoResult from "@/components/shared/NoResult";
import { redirect } from "next/navigation";
import { getSavedQuestions } from "@/lib/actions/question.action";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import { auth } from "@clerk/nextjs/server";

const Collection = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const { questions } = await getSavedQuestions({
		clerkId: userId!,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
				<LocalSearch
					route="/"
					placeholder="Search questions..."
					otherClasses="flex-1"
				/>{" "}
				<Filters
					filters={QuestionFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<div className="mt-10 flex flex-col gap-6">
				{questions.length > 0 ? (
					questions.map((question) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							answers={question.answers}
							author={question.author}
							createdAt={question.createdAt}
							tags={question.tags}
							views={question.views}
							title={question.title}
							upvotes={question.upvotes}
						/>
					))
				) : (
					<NoResult
						title={"There's no saved questions to show"}
						description="Find and save questions to see them here."
						link="/"
						btnText="All Questions"
					/>
				)}
			</div>
		</>
	);
};

export default Collection;