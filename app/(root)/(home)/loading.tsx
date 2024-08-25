import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<section>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>

				<Skeleton className="h-14 w-32" />
			</div>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center lg:flex-col">
				<Skeleton className="h-14 w-full" />
				<Skeleton className="hidden h-14 w-44 max-md:block max-sm:w-full" />
			</div>
			<div className="mt-10 hidden flex-wrap gap-3 md:flex">
				<Skeleton className="h-14 w-32" />
				<Skeleton className="h-14 w-32" />
				<Skeleton className="h-14 w-32" />
				<Skeleton className="h-14 w-32" />
				<Skeleton className="h-14 w-32" />
			</div>

			<div className="mt-10 flex flex-col gap-6">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
					<Skeleton className="h-60 w-full rounded-2xl" key={item} />
				))}
			</div>
		</section>
	);
};

export default Loading;
