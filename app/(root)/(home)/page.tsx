import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
	return (
		<div>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
			<h1>HomePAGE</h1>
		</div>
	);
};

export default Home;
