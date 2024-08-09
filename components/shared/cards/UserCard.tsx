import { getUserTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import RenderTag from "../RenderTag";

type Props = {
	user: {
		_id: string;
		clerkId: string;
		picture: string;
		name: string;
		username: string;
	};
};

const UserCard = async ({ user }: Props) => {
	const interactedTags = await getUserTags({
		userId: user._id,
	});

	return (
		<article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 sm:max-w-[260px]">
			<Link href={`/profile/${user.clerkId}`}>
				<Image
					src={user.picture}
					alt="user profile picture"
					width={100}
					height={100}
					className="rounded-full "
				/>
				<div className="mt-4 text-center">
					<h3 className="h3-bold text-dark200_light900 line-clamp-1">
						{user.name}
					</h3>
					<p className="body-regular text-dark500_light500 mt-2">
						@{user.username}
					</p>
				</div>
			</Link>

			<div className="mt-5">
				{interactedTags.length > 0 ? (
					<div className="flex items-center gap-2">
						{interactedTags.map((item) => (
							<RenderTag
								key={item._id}
								_id={item._id}
								title={item.name}
							/>
						))}
					</div>
				) : (
					<Badge> No tags</Badge>
				)}
			</div>
		</article>
	);
};

export default UserCard;