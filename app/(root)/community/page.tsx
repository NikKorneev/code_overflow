import UserCard from "@/components/shared/cards/UserCard";
import Filters from "@/components/shared/Filters";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Users | CodeOverflow",
	description: "CodeOverflow - all active and genius users",
	twitter: {
		images: "/assets/images/twitter-card.png",
		description: "CodeOverflow - all active and genius users",
		title: "Users | CodeOverflow",
	},
	openGraph: {
		images: "/assets/images/twitter-card.png",
	},
};
const Page = async ({ searchParams }: SearchParamsProps) => {
	const { users, isNext } = await getUsers({
		searchQuery: searchParams?.q,
		filter: searchParams?.filter,
		page: searchParams?.page ? +searchParams?.page : 1,
		pageSize: 10,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">All Users</h1>
			<div className="mt-11 flex  justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearch
					route="/community"
					placeholder="Search for users..."
					otherClasses="flex-1"
				/>{" "}
				<Filters
					filters={UserFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<section className="users-grid mt-12">
				{users.length > 0 ? (
					users.map((user) => <UserCard key={user._id} user={user} />)
				) : (
					<div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
						<p>No users found</p>
						<Link
							href="/sign-up"
							className="mt-1 font-bold text-accent-blue"
						>
							Join to be the first!
						</Link>
					</div>
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
