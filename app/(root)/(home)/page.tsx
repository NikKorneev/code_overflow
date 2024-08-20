import Filters from "@/components/shared/Filters";
import LocalSearch from "@/components/shared/search/LocalSearch";
import HomeFilters from "@/components/home/HomeFilters";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import NoResult from "@/components/shared/NoResult";
import { Question, SearchParamsProps } from "@/types";
import { getQuestions } from "@/lib/actions/question.action";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import Pagination from "@/components/shared/Pagination";

const Home = async ({ searchParams }: SearchParamsProps) => {
	const result = (await getQuestions({
		searchQuery: searchParams?.q,
		filter: searchParams?.filter,
		page: searchParams?.page ? +searchParams?.page : 1,
	})) as {
		questions: Question[];
		isNext: boolean;
	};

	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>

				<Link
					href="/ask-question"
					className="flex justify-end max-sm:w-full"
				>
					<Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
						Ask a Question
					</Button>
				</Link>
			</div>
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center lg:flex-col">
				<LocalSearch
					route="/"
					placeholder="Search questions..."
					otherClasses="flex-1"
				/>{" "}
				<Filters
					filters={HomePageFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					containerClasses="hidden max-md:flex"
				/>
			</div>
			<HomeFilters />

			<div className="mt-10 flex flex-col gap-6">
				{result.questions?.length > 0 ? (
					result.questions?.map((question) => (
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
						title={"There's no questions to show"}
						description={
							"Ask a question and kickstart the discussion!"
						}
						link="/ask-question"
						btnText="Ask a Question"
					/>
				)}
			</div>
			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams?.page : 1}
					isNext={result.isNext}
				/>
			</div>
		</>
	);
};

export default Home;
