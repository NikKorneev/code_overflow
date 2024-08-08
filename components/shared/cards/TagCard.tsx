import { Tag } from "@/types";
import Link from "next/link";
import RenderTag from "../RenderTag";

type Props = {
	questionsAmount: number;
} & Pick<Tag, "_id" | "description" | "name">;

const TagCard = ({ _id, name, questionsAmount, description }: Props) => {
	return (
		<Link href={`/tags/${_id}`}>
			<article className="card-wrapper items-center ">
				<RenderTag _id={_id} title={name} isLink={false} />

				<p className="small-medium text-dark300_light700  mt-3.5 line-clamp-5 font-normal">
					{description}
				</p>

				<p className="small-medium text-dark400_light500 mt-3.5">
					<span className="body-semibold primary-text-gradient mr-1">
						{questionsAmount}+
					</span>
					Questions
				</p>
			</article>
		</Link>
	);
};

export default TagCard;
