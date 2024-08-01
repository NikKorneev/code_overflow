import React from "react";
import SearchTemplate from "./SearchTemplate";

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
	return (
		<SearchTemplate
			placeholder={placeholder}
			styles={otherClasses}
			iconPosition={iconPosition}
		/>
	);
};

export default LocalSearch;
