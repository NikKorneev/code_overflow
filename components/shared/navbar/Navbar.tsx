import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 px-6 py-4 shadow-light-300 sm:px-12 dark:shadow-none">
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
			GlobalSearch
			<div className="flex-between gap-5">
				Theme
				<SignedOut>
					<SignInButton />
				</SignedOut>
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
				{/* MovileNav */}
			</div>
		</nav>
	);
};

export default Navbar;
