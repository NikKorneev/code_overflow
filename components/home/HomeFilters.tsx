"use client";
import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
	const searchParams = useSearchParams();
	const [active, setActive] = useState(searchParams.get("filter"));
	const router = useRouter();

	const handleTypeClick = (item: string) => {
		if (active === item) {
			setActive("");
			const newUrl = formUrlQuery({
				key: "filter",
				value: null,
				params: searchParams.toString(),
			});
			router.push(newUrl, { scroll: false });
		} else {
			setActive(item);
			const newUrl = formUrlQuery({
				key: "filter",
				value: item.toLowerCase(),
				params: searchParams.toString(),
			});
			router.push(newUrl, { scroll: false });
		}
	};

	return (
		<div className="mt-10 hidden flex-wrap gap-3 md:flex">
			{HomePageFilters.map((item) => (
				<Button
					key={item.value}
					onClickCapture={() => handleTypeClick(item.value)}
					className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
						active === item.value
							? "  bg-primary-100 dark:bg-dark-400"
							: " bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
					}`}
				>
					<p
						className={`${
							active === item.value
								? "text-orange-500  dark:text-primary-500"
								: ""
						}`}
					>
						{item.name}
					</p>
				</Button>
			))}
		</div>
	);
};

export default HomeFilters;
