import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const SidebarQuestion = ({ text }: { text: string }) => {
	return (
		<Link
			href={`/REFACTOR`}
			className=" flex cursor-pointer justify-between gap-1 rounded-md px-4 transition-opacity hover:opacity-70"
		>
			<p className="text-dark500_light700">
				{text.length > 80 ? text.slice(0, 86).trim() + "..." : text}
			</p>
			<Image
				src="/assets/icons/chevron-right.svg"
				alt="visit question mark icon"
				width={20}
				height={20}
				className="invert-colors"
			/>
		</Link>
	);
};

const RightSidebar = () => {
	const text =
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda minus minima, repellendus eius quam beatae?  quam beatae?";
	return (
		<aside className="right-sidebar background-light900_dark200 custom-scrollbar fixed right-0 top-0 h-screen overflow-y-auto  px-2 pt-36  shadow-xl max-xl:hidden">
			<div>
				<h2 className="h2-bold text-dark400_light900 px-6">
					Hot Network
				</h2>
				<div className="mt-8 flex flex-col gap-7">
					<SidebarQuestion text={text} />
					<SidebarQuestion text={text} />
					<SidebarQuestion text={text} />
				</div>
				<h2 className="h2-bold text-dark400_light900 px-6 pt-14">
					Popular Tags
				</h2>
				<div className="mt-7 flex flex-col gap-4 px-4">
					<RenderTag
						title="javascript"
						count={2000}
						showCount
						_id={"1"}
					/>
				</div>
			</div>
		</aside>
	);
};

export default RightSidebar;
