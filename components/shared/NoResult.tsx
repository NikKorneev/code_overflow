import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {
	description: string;
	title: string;
	link: string;
	btnText: string;
};

const NoResult = ({ title, description, link, btnText }: Props) => {
	return (
		<div className="mt-6 flex w-full flex-col items-center justify-center">
			<Image
				src="/assets/images/light-illustration.png"
				alt="No result found illustration"
				width={270}
				height={200}
				className="block object-contain dark:hidden"
			/>
			<Image
				src="/assets/images/dark-illustration.png"
				alt="No result found illustration"
				width={270}
				height={200}
				className="hidden object-contain dark:flex"
			/>
			<h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
			<p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
				{description}
			</p>
			<Link href={link}>
				<Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 transition-colors hover:opacity-85 ">
					{btnText}
				</Button>
			</Link>
		</div>
	);
};

export default NoResult;
