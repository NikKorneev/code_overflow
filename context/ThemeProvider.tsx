"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
	setMode: (theme: ThemeContextType["mode"]) => void;
	mode: "light" | "dark" | "system" | null;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<ThemeContextType["mode"]>(null);

	const handleThemeChange = () => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			setMode("dark");
			localStorage.theme === "dark";
			document.body.classList.add("dark");
			document.body.classList.remove("light");
		} else {
			setMode("light");
			localStorage.theme === "light";
			document.body.classList.add("light");
			document.body.classList.remove("dark");
		}
	};

	useEffect(() => {
		handleThemeChange();
	}, []);

	useEffect(() => {
		if (
			mode === "dark" ||
			(mode === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
			localStorage.theme = "dark";
		} else if (
			mode === "light" ||
			(mode === "system" &&
				!window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
			localStorage.theme = "light";
		}
	}, [mode]);

	// useEffect(() => {
	// 	if (localStorage.getItem("theme")) {
	// 		setMode(localStorage.theme);
	// 	}
	// }, []);

	return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context as ThemeContextType;
}
