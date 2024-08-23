import AnswerTab from "@/components/shared/AnswerTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile } from "@/lib/actions/user.action";
import { getDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params, searchParams }: URLProps) => {
	const { userId } = auth();
	const { user, totalAnswers, totalQuestions, badgeCounts, reputation } =
		await getUserProfile({
			username: params.id,
		});

	return (
		<>
			<div className="flex flex-col-reverse items-start justify-between sm:flex-row">
				<div className="flex flex-col items-start gap-4 lg:flex-row">
					<Image
						src={user.picture}
						alt="user's image"
						className="rounded-full object-cover"
						width={140}
						height={140}
					/>

					<div className="mt-3">
						<h2 className="h2-bold text-dark100_light900">
							{user.name}
						</h2>
						<p className="paragraph-regular text-dark200_light800">
							@{user.username}
						</p>
						<div className="mt-5 flex flex-wrap items-center justify-start gap-5">
							{user.portfolioWebsite && (
								<ProfileLink
									imgUrl="/assets/icons/link.svg"
									href={user.portfolioWebsite}
									title="Portfolio"
								/>
							)}
							{user.location && (
								<ProfileLink
									imgUrl="/assets/icons/location.svg"
									title={user.location}
								/>
							)}
							{user.joinedAt && (
								<ProfileLink
									imgUrl="/assets/icons/calendar.svg"
									title={getDate(user.joinedAt)}
								/>
							)}
						</div>
						{user.bio && (
							<p className="paragraph-regular text-dark400_light800 mt-8 ">
								{user.bio}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-end max-sm:w-full sm:mt-3">
					<SignedIn>
						{userId === user.clerkId && (
							<Link href="/profile/edit">
								<Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[170px] px-4 py-3">
									Edit Profile
								</Button>
							</Link>
						)}
					</SignedIn>
				</div>
			</div>
			<Stats
				totalQuestions={totalQuestions}
				totalAnswers={totalAnswers}
				badgeCounts={badgeCounts}
				reputation={reputation}
			/>
			<div className="mt-10 flex gap-10">
				<Tabs defaultValue="top-posts" className="flex-1">
					<TabsList className="background-light800_dark400 min-h-[42px] p-1">
						<TabsTrigger
							value="top-posts"
							className="tab data-[state=active]:bg-primary-500 data-[state=active]:text-light-900"
						>
							Top Posts
						</TabsTrigger>
						<TabsTrigger value="answers" className="tab">
							Answers
						</TabsTrigger>
					</TabsList>
					<TabsContent value="top-posts">
						<QuestionTab
							clerkId={user.clerkId}
							userId={user._id}
							searchParams={searchParams}
						/>
					</TabsContent>
					<TabsContent value="answers">
						<AnswerTab
							clerkId={user.clerkId}
							userId={user._id}
							searchParams={searchParams}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
};

export default Page;
