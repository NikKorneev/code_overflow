"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
type Props = {
	type: "Question" | "Answer";
	itemId: string;
};

const EditDeleteAction = ({ itemId, type }: Props) => {
	const pathname = usePathname();
	const router = useRouter();

	const handleEdit = () => {
		router.push(`/question/edit/${JSON.parse(itemId)}`);
	};

	const handleDelete = async () => {
		if (type === "Question" && itemId) {
			await deleteQuestion({
				questionId: JSON.parse(itemId),
				path: pathname,
			});
			return toast({
				title: "Question deleted",
				variant: "destructive",
			});
		} else if (type === "Answer" && itemId) {
			await deleteAnswer({
				answerId: JSON.parse(itemId),
				path: pathname,
			});
			return toast({
				title: "Answer deleted",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="flex items-center justify-end gap-3 max-sm:w-full">
			{type === "Question" && (
				<Image
					src="/assets/icons/edit.svg"
					width={14}
					height={14}
					alt="edit"
					className="cursor-pointer object-contain"
					onClick={handleEdit}
				/>
			)}
			<Image
				src="/assets/icons/trash.svg"
				width={14}
				height={14}
				alt="delete"
				className="cursor-pointer object-contain"
				onClick={handleDelete}
			/>
		</div>
	);
};

export default EditDeleteAction;
