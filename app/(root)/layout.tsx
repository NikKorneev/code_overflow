import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/sidebars/LeftSidebar";
import RightSidebar from "@/components/shared/sidebars/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const { userId } = auth();
	let mongoUsername;

	if (userId) {
		mongoUsername = (await getUserById({ userId }))?.username;
	}

	return (
		<main className="background-light850_dark100 relative">
			<Navbar />
			<div className="sm:custom-grid">
				<LeftSidebar curUsername={mongoUsername} />
				<section className="col-start-2 col-end-3 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-6 xl:px-10 ">
					<div className="mx-auto w-full">{children}</div>
				</section>
				<RightSidebar />
			</div>

			<Toaster />
		</main>
	);
};

export default Layout;
