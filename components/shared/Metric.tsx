import { getCountToString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";

type MetricProps = {
	icon: string;
	title: string;
	value: string | number;
	alt: string;
	textStyles?: string;
	href?: string;
	isAuthor?: boolean;
};

const Metric = ({
	icon,
	title,
	value,
	alt,
	href,
	isAuthor,
	textStyles,
}: MetricProps) => {
	const MetricContent = (
		<>
			<Image
				src={icon}
				alt={alt}
				width={16}
				height={16}
				className={`object-contain ${
					href ? "rounded-full" : ""
				} fill-accent-blue *:stroke-accent-blue`}
			/>
			<p className={` ${textStyles} flex items-center gap-1 `}>
				<span className="font-semibold">
					{typeof value === "number"
						? getCountToString(value)
						: value}
				</span>{" "}
				<span className="text-xs font-light lg:text-sm">{title}</span>
			</p>
		</>
	);
	if (href) {
		return (
			<Link href={href} className="flex-center gap-1">
				{MetricContent}
			</Link>
		);
	}

	return <div className="flex items-center gap-1">{MetricContent}</div>;
};
export default Metric;
