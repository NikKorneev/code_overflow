import Filters from "@/components/shared/Filters";
import LocalSearch from "@/components/shared/search/LocalSearch";
import HomeFilters from "@/components/home/HomeFilters";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import QuestionCard from "@/components/shared/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { Question } from "@/types";

const questions: Question[] = [
	{
		id: "1",
		title: "How do I use the Lightning Component?",
		tags: [
			{ id: "1", title: "python" },
			{ id: "2", title: "databases" },
			{ id: "3", title: "mongodb" },
		],
		author: {
			name: "John Doe",
			id: "1",
			picture: "/assets/images/default-logo.svg",
		},
		upvotes: 500,
		views: 20000,
		answers: [{ obj: "hello" }],
		createdAt: new Date("2024-07-16"),
	},
	{
		id: "2",
		title: "How to center a div",
		tags: [
			{ id: "1", title: "css" },
			{ id: "2", title: "html" },
			{ id: "3", title: "mongodb" },
		],
		author: {
			name: "John Doe",
			id: "2",
			picture: "/assets/images/default-logo.svg",
		},
		upvotes: 500,
		views: 1200,
		answers: [{ obj: "hello" }],
		createdAt: new Date("2022-01-01"),
	},
];

const Home = () => {
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
				{questions.length > 0 ? (
					questions?.map((question) => (
						<QuestionCard key={question.id} {...question} />
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
		</>
	);
};

export default Home;
