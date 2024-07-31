"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
	const pathname = usePathname();
	return (
		<aside className="sidebar background-light900_dark200 fixed h-screen  overflow-scroll px-2 shadow-lg dark:border-r-2 dark:border-r-neutral-900 dark:shadow-none max-sm:hidden lg:px-6">
			<ul className=" flex min-h-full flex-col justify-between pb-2">
				<div className="flex shrink-0 grow flex-col justify-center">
					{sidebarLinks.map((item) => {
						const isActive =
							(pathname.includes(item.route) &&
								item.route.length > 1) ||
							pathname === item.route;

						return (
							<li key={item.route}>
								<Link
									href={item.route}
									className={`${
										isActive
											? "primary-gradient rounded-lg text-light-900"
											: "text-dark300_light900"
									} flex items-center justify-start gap-4 bg-transparent p-4`}
								>
									<Image
										src={item.imgURL}
										alt={item.label}
										width={20}
										height={20}
										className={`${
											isActive ? "" : "invert-colors"
										}`}
									/>
									<p
										className={`${
											isActive
												? "base-bold"
												: "base-medium"
										} max-lg:hidden`}
									>
										{item.label}
									</p>
								</Link>
							</li>
						);
					})}
				</div>
				<SignedIn>
					<li>
						<SignOutButton>
							<div className="base-medium text-dark300_light900 flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4">
								<Image
									src="/assets/icons/logout.svg"
									alt={"sign out icon"}
									width={20}
									height={20}
									className="invert-colors"
								/>
								<p className={`max-lg:hidden`}>Sign Out</p>
							</div>
						</SignOutButton>
					</li>
				</SignedIn>
			</ul>
		</aside>
	);
};

export default LeftSidebar;
