import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<section>
			<h1 className="h1-bold text-dark100_light900">All Tags</h1>

			<div className="mb-12 mt-11 flex flex-wrap gap-5">
				<Skeleton className="h-14 flex-1 " />
				<Skeleton className="h-14 w-[170px]" />
			</div>
			<div className="mt-12 flex flex-wrap justify-between gap-4">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
					(item) => (
						<Skeleton className="size-48 rounded-2xl" key={item} />
					)
				)}
			</div>
		</section>
	);
};

export default Loading;
