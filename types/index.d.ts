import { BADGE_CRITERIA } from "@/constants";
export interface SidebarLink {
	imgURL: string;
	route: string;
	label: string;
}
export interface Job {
	id?: string;

	employer_name?: string;
	employer_logo?: string | undefined;
	employer_website?: string;
	job_employment_type?: string;
	job_title?: string;
	job_description?: string;
	job_apply_link?: string;
	job_city?: string;
	job_state?: string;
	job_country?: string;
}
export interface Country {
	name: {
		common: string;
	};
}
export interface ParamsProps {
	params: { id: string };
}
export interface SearchParamsProps {
	searchParams: { [key: string]: string | undefined };
}
export interface URLProps {
	params: { id: string };
	searchParams: { [key: string]: string | undefined };
}
export interface BadgeCounts {
	GOLD: number;
	SILVER: number;
	BRONZE: number;
}
export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export type Filter = {
	name: string;
	value: string;
};

export type Tag = {
	_id: string;
	name: string;
	questions: Question[];
	followers: User[];
	description?: string;
};

export type Question = {
	_id: string;
	title: string;
	tags: Tag[];
	content: string;
	author: {
		_id: string;
		name: string;
		picture: string;
		username: string;
		clerkId: string;
	};
	upvotes: Record<string, string>[];
	downvotes: Record<string, string>[];
	views: number;
	answers: Array<object>;
	createdAt: Date;
};

export type IAnswer = {
	question: string;
	author: string;
	content: string;
	upvotes: any[];
	downvotes: any[];
	createdAt: Date;
};

export type BadgeParam = {
	type: BadgeCriteriaType;
	count: number;
}[];
