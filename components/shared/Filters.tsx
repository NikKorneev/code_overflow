"use client";

import React, { useState } from "react";
import { Filter } from "@/types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type FiltersProps = {
	filters: Filter[];
	otherClasses?: string;
	containerClasses?: string;
};

const Filters = ({ filters, containerClasses, otherClasses }: FiltersProps) => {
	const [active, setActive] = useState("");

	return (
		<div className={`relative ${containerClasses}`}>
			<Select onValueChange={(value) => setActive(value)}>
				<SelectTrigger
					className={`${otherClasses} body-regular light-border background-light800_darkgradient text-dark500_light700 border px-5 py-2.5  dark:border-neutral-900`}
				>
					<div className="line-clamp-1 flex-1 text-left">
						<SelectValue placeholder="Select a Filter" />
					</div>
				</SelectTrigger>
				<SelectContent className="background-light800_darkgradient">
					{filters.map((filter) => {
						return (
							<SelectItem
								key={filter.value}
								value={filter.value}
								className="text-dark500_light700 transition-colors hover:bg-neutral-200 dark:hover:bg-slate-900"
							>
								{filter.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};

export default Filters;
