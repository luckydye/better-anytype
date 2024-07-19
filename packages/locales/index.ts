import defaults from "./default.json";

export const translate = (key: string, override?: string): string => {
	return defaults[key] || `!${key}!`;
};
