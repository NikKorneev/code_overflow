import { SidebarLink } from "@/types";

export const themes = [
	{ value: "light" as const, label: "Light", icon: "/assets/icons/sun.svg" },
	{ value: "dark" as const, label: "Dark", icon: "/assets/icons/moon.svg" },
	{
		value: "system" as const,
		label: "System",
		icon: "/assets/icons/computer.svg",
	},
];
export const sidebarLinks: SidebarLink[] = [
	{
		imgURL: "/assets/icons/home.svg",
		route: "/",
		label: "Home",
	},
	{
		imgURL: "/assets/icons/users.svg",
		route: "/community",
		label: "Community",
	},
	{
		imgURL: "/assets/icons/star.svg",
		route: "/collection",
		label: "Collections",
	},
	// {
	// 	imgURL: "/assets/icons/suitcase.svg",
	// 	route: "/jobs",
	// 	label: "Find Jobs",
	// },
	{
		imgURL: "/assets/icons/tag.svg",
		route: "/tags",
		label: "Tags",
	},
	{
		imgURL: "/assets/icons/user.svg",
		route: "/profile",
		label: "Profile",
	},
	{
		imgURL: "/assets/icons/question.svg",
		route: "/ask-question",
		label: "Ask a question",
	},
];

export const BADGE_CRITERIA = {
	QUESTION_COUNT: {
		BRONZE: 3,
		SILVER: 8,
		GOLD: 15,
	},
	ANSWER_COUNT: {
		BRONZE: 10,
		SILVER: 50,
		GOLD: 100,
	},
	QUESTION_UPVOTES: {
		BRONZE: 20,
		SILVER: 30,
		GOLD: 50,
	},
	ANSWER_UPVOTES: {
		BRONZE: 10,
		SILVER: 20,
		GOLD: 30,
	},
	TOTAL_VIEWS: {
		BRONZE: 1000,
		SILVER: 10000,
		GOLD: 100000,
	},
};
