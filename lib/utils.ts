import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
