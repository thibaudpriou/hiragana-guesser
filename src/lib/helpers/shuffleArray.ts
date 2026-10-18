export const shuffleArray = <T>(arr: T[]): T[] => {
	const sortArr: Array<{ el: T; order: number }> = [];
	arr.forEach((el) => {
		sortArr.push({ el, order: Math.random() });
	});

	return sortArr.sort((a, b) => a.order - b.order).map((r) => r.el);
};
