import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const GlobalSearch = () => {
	return (
		<div className="relative w-full max-w-[35vw] max-lg:hidden">
			<div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
				<Image
					src="/assets/icons/search.svg"
					alt="search icon"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
				<Input
					placeholder="Search anything globally..."
					type="text"
					className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient  border-none shadow-none outline-none"
				/>
			</div>
		</div>
	);
};

export default GlobalSearch;
