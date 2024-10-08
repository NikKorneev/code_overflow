import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BadgeCounts, BadgeCriteriaType, BadgeParam } from "@/types";
import { BADGE_CRITERIA } from "@/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
	const now = new Date();
	const secondsAgo = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "week", seconds: 604800 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 },
	];

	for (const interval of intervals) {
		const count = Math.floor(secondsAgo / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
};

export const getCountToString = (count: number): string => {
	const intervals = [
		{ label: "m", count: 1000000 },
		{ label: "k", count: 1000 },
	];

	for (const interval of intervals) {
		if (Math.floor(count / interval.count) >= 1) {
			return `${
				`${(count / interval.count).toFixed(1)}`.includes(".0")
					? `${Math.floor(count / interval.count)}`
					: `${(count / interval.count).toFixed(1)}`
			}${interval.label}`;
		}
	}

	return count.toString();
};

export const getDate = (createdAt: Date): string => {
	const month = createdAt.toLocaleString("default", {
		month: "short",
	});
	const year = createdAt.getFullYear();
	return `${month} ${year}`;
};

interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

export const formUrlQuery = ({ key, params, value }: UrlQueryParams) => {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
};

interface RemoveUrlQueryParams {
	params: string;
	keys: string[];
}

export const removeKeysFromQuery = ({ keys, params }: RemoveUrlQueryParams) => {
	const currentUrl = qs.parse(params);

	keys.forEach((key) => {
		delete currentUrl[key];
	});

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
};

export function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const assingBadges = (criteria: BadgeParam) => {
	const badgeCounts: BadgeCounts = {
		BRONZE: 0,
		SILVER: 0,
		GOLD: 0,
	};

	criteria.forEach(({ type, count }) => {
		const badgeLevels = BADGE_CRITERIA[type];

		Object.keys(badgeLevels).forEach((level: any) => {
			if (count >= badgeLevels[level as keyof BadgeCounts]) {
				badgeCounts[level as keyof BadgeCounts] += 1;
			}
		});
	});

	return badgeCounts;
};
