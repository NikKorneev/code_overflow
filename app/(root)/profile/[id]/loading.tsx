import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<section>
			<div className="flex flex-col-reverse items-start justify-between sm:flex-row">
				<div className="flex flex-col items-start gap-4 lg:flex-row">
					<Skeleton className="size-36 rounded-full " />

					<div className="mt-3 ">
						<div className="space-y-2">
							<Skeleton className="h-6 w-36" />
							<Skeleton className="h-6 w-36" />
						</div>
						<div className="my-5 flex flex-wrap items-center justify-start gap-5">
							<Skeleton className="h-7 w-40" />
							<Skeleton className="h-7 w-40" />
							<Skeleton className="h-7 w-40" />
						</div>
						<Skeleton className="h-14 w-2/3" />
					</div>
				</div>
			</div>
			<div className="mt-10">
				<div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
					<Skeleton className="h-24 w-full" />
					<Skeleton className="h-24 w-full" />
					<Skeleton className="h-24 w-full" />
					<Skeleton className="h-24 w-full" />
				</div>
			</div>
			<div className="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2">
				<Skeleton className="h-40 w-full" />
				<Skeleton className="h-40 w-full" />
				<Skeleton className="h-40 w-full" />
				<Skeleton className="h-40 w-full" />
			</div>
		</section>
	);
};

export default Loading;
