"use client";
import { useEffect, useState } from "react";
import SearchTemplate from "./SearchTemplate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams?.get("g");
	const [search, setSearch] = useState(query || "");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "g",
					value: search,
				});

				router.push(newUrl, { scroll: false });
			} else if (query) {
				const newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keys: ["g", "type"],
				});
				router.push(newUrl, { scroll: false });
			}
		}, 500);

		return () => {
			clearTimeout(delayDebounceFn);
		};
	}, [search, router, pathname, searchParams, query]);

	return (
		<div className="relative w-[45vw] max-lg:hidden xl:w-[38vw]">
			<SearchTemplate
				setValue={(e) => {
					setSearch(e.target.value);
					if (!isOpen) setIsOpen(true);
					if (e.target.value === "" && isOpen) setIsOpen(false);
				}}
				value={search}
				placeholder="Search anything globally..."
				containerStyles="max-lg:hidden"
			/>
			{isOpen && <GlobalResult />}
		</div>
	);
};

export default GlobalSearch;
