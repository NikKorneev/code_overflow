"use client";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
	pageNumber: number;
	isNext: boolean;
	type?: "userAnswersPage" | "userQuestionsPage";
};

const Pagination = ({ isNext, pageNumber, type }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleNavigation = (direction: string) => {
		const nextPageNumber =
			direction === "next" ? pageNumber + 1 : pageNumber - 1;

		const newUrl = formUrlQuery({
			key: type || "page",
			value: nextPageNumber.toString(),
			params: searchParams.toString(),
		});

		router.push(newUrl);
	};

	if (!isNext && pageNumber === 1) {
		return null;
	}

	return (
		<div className="flex w-full items-center justify-center gap-2">
			<Button
				disabled={pageNumber === 1}
				className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
				onClick={() => handleNavigation("prev")}
			>
				<p className="body-medium text-dark200_light800">Prev</p>
			</Button>
			<div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
				<p className="body-semibold text-light-900">{pageNumber}</p>
			</div>
			<Button
				disabled={!isNext}
				className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
				onClick={() => handleNavigation("next")}
			>
				<p className="body-medium text-dark200_light800">Next</p>
			</Button>
		</div>
	);
};

export default Pagination;
