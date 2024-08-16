import Image from "next/image";
import Link from "next/link";
import RenderTag from "../RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.action";

const SidebarQuestion = ({ text, link }: { text: string; link: string }) => {
	return (
		<Link
			href={`/question/${JSON.parse(link)}`}
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

const RightSidebar = async () => {
	const { hotQuestions } = await getHotQuestions();
	const { hotTags } = await getHotTags();

	return (
		<aside className="right-sidebar background-light900_dark200 custom-scrollbar fixed right-0 top-0 h-screen overflow-y-auto  px-2 pt-36  shadow-xl max-xl:hidden">
			<div>
				<h2 className="h2-bold text-dark400_light900 px-6">
					Hot Network
				</h2>
				<div className="mt-8 flex flex-col gap-7">
					{hotQuestions.map((question) => (
						<SidebarQuestion
							text={question.title}
							key={JSON.stringify(question._id)}
							link={JSON.stringify(question._id)}
						/>
					))}
				</div>
				<h2 className="h2-bold text-dark400_light900 px-6 pt-14">
					Popular Tags
				</h2>
				<div className="mt-7 flex flex-col gap-4 px-4">
					{hotTags.map((tag) => (
						<RenderTag
							key={JSON.stringify(tag._id)}
							title={tag.name}
							count={tag.numberOfQuestions}
							showCount
							_id={tag._id}
						/>
					))}
				</div>
			</div>
		</aside>
	);
};

export default RightSidebar;
