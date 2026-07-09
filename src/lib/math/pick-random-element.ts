const randomInt = (max: number) => Math.floor(Math.random() * max);

export const pickRandomElement = <T>(arr: T[]) => {
	const index = randomInt(arr.length);

	return arr.at(index)!;
};
