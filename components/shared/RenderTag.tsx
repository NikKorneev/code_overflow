import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

type Props = {
	title: string;
	count?: number;
	showCount?: boolean;
	_id: string;
};

const RenderTag = ({ title, count, _id, showCount }: Props) => {
	return (
		<Link
			href={`/tags/${_id}`}
			className="flex items-center justify-between gap-2"
		>
			<Badge className="subtle-medium background-light800_dark400  justify-between rounded-md  px-4  py-2 uppercase text-light-400 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2  dark:border-slate-800 dark:text-[#7b8ec8]  dark:focus:ring-slate-300">
				{title}
			</Badge>
			{showCount && (
				<p className="text-dark500_light700 small-medium text-sm">
					{count}+
				</p>
			)}
		</Link>
	);
};

export default RenderTag;
