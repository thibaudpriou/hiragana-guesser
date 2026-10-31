export type GuessModeUrl = '/guess-romanji' | '/guess-character' | '/guess-word';
const GUESS_MODE_URL_ALLOWED: string[] = [
	'/guess-romanji',
	'/guess-character',
	'/guess-word',
] satisfies GuessModeUrl[];

export const validateGuessModeUrl = (url: string | GuessModeUrl): url is GuessModeUrl => {
	return GUESS_MODE_URL_ALLOWED.includes(url);
};
