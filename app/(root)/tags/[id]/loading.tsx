import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<section>
			<h1 className="h1-bold text-dark100_light900 flex items-center gap-1">
				<Skeleton className="h-14 w-32" />
				tag
			</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
				<Skeleton className="h-14 w-full" />
			</div>

			<div className="mt-10">
				<div className="grid grid-cols-2 justify-center gap-6 max-md:flex max-md:flex-col">
					<Skeleton className="h-60 w-full rounded-2xl " />
					<Skeleton className="h-60 w-full rounded-2xl " />
					<Skeleton className="h-60 w-full rounded-2xl " />
					<Skeleton className="h-60 w-full rounded-2xl " />
					<Skeleton className="h-60 w-full rounded-2xl " />
					<Skeleton className="h-60 w-full rounded-2xl " />
				</div>
			</div>
		</section>
	);
};

export default Loading;
