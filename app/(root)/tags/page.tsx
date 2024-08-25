import TagCard from "@/components/shared/cards/TagCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tags | CodeOverflow",
	description: "CodeOverflow - search for all used and popular tags",
	twitter: {
		images: "/assets/images/twitter-card.png",
	},
	openGraph: {
		images: "/assets/images/twitter-card.png",
	},
};

const Page = async ({ searchParams }: SearchParamsProps) => {
	const { tags, isNext } = await getAllTags({
		searchQuery: searchParams?.q,
		filter: searchParams?.filter,
		page: searchParams?.page ? +searchParams?.page : 1,
		pageSize: 20,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">All Tags</h1>
			<div className="mt-11 flex  justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearch
					route="/tags"
					placeholder="Search for tags..."
					otherClasses="flex-1"
				/>{" "}
				<Filters
					filters={TagFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<section className="mt-12 ">
				{tags?.length > 0 ? (
					<div className=" flex flex-wrap justify-between gap-4">
						{tags.map((item) => (
							<TagCard
								_id={item._id}
								key={item._id}
								name={item.name}
								description={item.description}
								questionsAmount={item.questions?.length}
							/>
						))}
					</div>
				) : (
					<NoResult
						title="No tags found"
						description="It looks like there are no tags found"
						link="/ask-question"
						btnText="Ask a question"
					/>
				)}
			</section>

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
