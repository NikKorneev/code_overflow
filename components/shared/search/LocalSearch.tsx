"use client";
import { useEffect, useState } from "react";
import SearchTemplate from "./SearchTemplate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type LocalSearchProps = {
	route: string;
	iconPosition?: "left" | "right";
	placeholder: string;
	otherClasses?: string;
};

const LocalSearch = ({
	route,
	iconPosition = "left",
	placeholder,
	otherClasses,
}: LocalSearchProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams?.get("q");
	const [search, setSearch] = useState(query || "");

	const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "q",
					value: search,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (pathname === route) {
					const newUrl = removeKeysFromQuery({
						params: searchParams.toString(),
						keys: ["q"],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [search, route, pathname, router, searchParams, query]);

	return (
		<SearchTemplate
			placeholder={placeholder}
			styles={otherClasses}
			iconPosition={iconPosition}
			value={search}
			setValue={onHandleChange}
		/>
	);
};

export default LocalSearch;
