import React from "react";
import SearchTemplate from "./SearchTemplate";

const GlobalSearch = () => {
	return (
		<SearchTemplate
			placeholder="Search anything globally..."
			containerStyles="max-w-[35vw] max-lg:hidden"
		/>
	);
};

export default GlobalSearch;
