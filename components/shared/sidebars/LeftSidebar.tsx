"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SidebarLink from "./SidebarLink";

const LeftSidebar = () => {
	const pathname = usePathname();
	return (
		<aside className="sidebar custom-scrollbar dark:custom-scrollbar-dark background-light900_dark200 fixed h-screen overflow-y-scroll  px-2 pt-36 shadow-md max-sm:hidden lg:px-6 dark:border-r-2 dark:border-r-neutral-900 dark:shadow-none">
			<ul className=" flex min-h-full flex-col justify-between gap-1 pb-2">
				<div className="flex shrink-0 grow flex-col gap-1">
					{sidebarLinks.map((item) => {
						const isActive =
							(pathname.includes(item.route) &&
								item.route.length > 1) ||
							pathname === item.route;

						if (item.route === "/profile") {
							return (
								<li key={item.route}>
									<SignedIn>
										<SidebarLink
											{...item}
											isActive={isActive}
										/>
									</SignedIn>
								</li>
							);
						}

						return (
							<li key={item.route}>
								<SidebarLink {...item} isActive={isActive} />
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
