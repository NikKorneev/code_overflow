import Image from "next/image";
import Link from "next/link";
import React from "react";

type SidebarLinkProps = {
	route: string;
	isActive: boolean;
	imgURL: string;
	label: string;
};

const SidebarLink = ({ imgURL, isActive, label, route }: SidebarLinkProps) => {
	return (
		<Link
			href={route}
			className={`${
				isActive
					? "primary-gradient rounded-lg text-light-900"
					: "text-dark300_light900"
			} flex items-center justify-start gap-4 rounded-lg bg-transparent p-4 transition-colors hover:bg-slate-100 hover:dark:bg-slate-800/50`}
		>
			<Image
				src={imgURL}
				alt={label}
				width={20}
				height={20}
				className={`${isActive ? "" : "invert-colors"}`}
			/>
			<p
				className={`${
					isActive ? "base-bold" : "base-medium"
				} max-lg:hidden`}
			>
				{label}
			</p>
		</Link>
	);
};

export default SidebarLink;
