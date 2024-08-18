"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type SearchTemplateProps = {
	placeholder: string;
	containerStyles?: string;
	styles?: string;
	iconPosition?: "left" | "right";
	value?: string;
	setValue?: React.ChangeEventHandler<HTMLInputElement>;
};
const SearchTemplate = ({
	placeholder,
	containerStyles,
	styles,
	iconPosition = "left",
	setValue,
	value,
}: SearchTemplateProps) => {
	return (
		<div className={`relative w-full ${containerStyles}`}>
			<div
				className={`background-light800_dark300 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4  ${styles} ${
					iconPosition === "left" ? "" : "flex-row-reverse"
				}`}
			>
				<Image
					src="/assets/icons/search.svg"
					alt="search icon"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
				<Input
					placeholder={placeholder}
					type="text"
					value={value}
					onChange={setValue}
					className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient  border-none shadow-none outline-none"
				/>
			</div>
		</div>
	);
};

export default SearchTemplate;
