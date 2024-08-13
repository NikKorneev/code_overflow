import QuestionCard from "@/components/shared/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import { title } from "process";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
	const { questions, tagTitle } = await getQuestionsByTagId({
		tagId: params.id,
		page: 1,
		searchQuery: searchParams?.q,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">
				<span className="uppercase text-primary-500">{tagTitle}</span>{" "}
				tag
			</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
				<LocalSearch
					route="/"
					placeholder="Search tag questions..."
					otherClasses="flex-1"
				/>
			</div>

			<div className="mt-10 grid grid-cols-2 justify-center gap-6 max-md:flex max-md:flex-col">
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
						title={"There's no tag questions to show"}
						description=""
						link="/"
						btnText="All Questions"
					/>
				)}
			</div>
		</>
	);
};

export default Page;
