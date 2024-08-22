import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import { Button } from "@/components/ui/button";

const Navbar = () => {
	return (
		<nav className="flex-between background-light900_dark200 fixed z-50 w-full items-center gap-5 px-6 py-4  shadow-light-300 sm:px-12 dark:shadow-none">
			<Link href="/" className="flex items-center gap-1">
				<Image
					src="/assets/images/site-logo.svg"
					width={32}
					height={32}
					alt="site logo CodeOverflow"
				/>

				<p className="h2-bold font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
					Code<span className="text-primary-500">Overflow</span>
				</p>
			</Link>
			<GlobalSearch />
			<div className="flex-between items-center  gap-5">
				<Theme />

				<SignedIn>
					<UserButton
						appearance={{
							elements: {
								avatarBox: "h-10 w-10",
							},
							variables: {
								colorPrimary: "#449BEC",
							},
						}}
					/>
				</SignedIn>
				<div className=" max-sm:hidden">
					<SignedOut>
						<Link href="/sign-in">
							<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
								<span className="primary-text-gradient">
									Log In
								</span>
							</Button>
						</Link>
					</SignedOut>
				</div>
				<MobileNav />
			</div>
		</nav>
	);
};

export default Navbar;
