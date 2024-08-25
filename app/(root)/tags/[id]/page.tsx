import QuestionCard from "@/components/shared/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
	{ params, searchParams }: URLProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const { tagTitle } = await getQuestionsByTagId({
		tagId: params.id,
		pageSize: 1,
	});

	return {
		title: `${tagTitle} tag | CodeOverflow`,
		description: `See all questions related with ${tagTitle} tag`,
		twitter: {
			images: "/assets/images/twitter-card.png",
		},
		openGraph: {
			images: "/assets/images/twitter-card.png",
		},
	};
}

const Page = async ({ params, searchParams }: URLProps) => {
	const { questions, tagTitle, isNext } = await getQuestionsByTagId({
		tagId: params.id,
		page: searchParams?.page ? +searchParams?.page : 1,
		searchQuery: searchParams?.q,
		pageSize: 20,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">
				<span className="uppercase text-primary-500">{tagTitle}</span>{" "}
				tag
			</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
				<LocalSearch
					route={`/tags/${params.id}`}
					placeholder="Search tag questions..."
					otherClasses="flex-1"
				/>
			</div>

			<div className="mt-10">
				{questions.length > 0 ? (
					<div className="grid grid-cols-2 justify-center gap-6 max-md:flex max-md:flex-col">
						{questions.map((question) => (
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
						))}
					</div>
				) : (
					<div className="flex justify-center">
						<NoResult
							title={"There's no tag questions to show"}
							description=""
							link="/"
							btnText="All Questions"
						/>
					</div>
				)}
			</div>
			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams?.page : 1}
					isNext={isNext}
				/>
			</div>
		</>
	);
};

export default Page;
