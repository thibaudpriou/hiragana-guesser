export type SelectionNextPagesName = '/guess-romanji' | '/guess-character' | '/guess-word';
const SELECTION_NEXT_PAGE_NAMES: string[] = [
	'/guess-romanji',
	'/guess-character',
	'/guess-word',
] satisfies SelectionNextPagesName[];

export const validateSelectionNextPage = (
	url: string | SelectionNextPagesName
): url is SelectionNextPagesName => {
	return SELECTION_NEXT_PAGE_NAMES.includes(url);
};
