let initialTouchX: null | number = null;

const SWIPE_MIN_DETECTION = 50;

export const onTouchStart = (event: TouchEvent) => {
	if (!event.touches[0]) {
		initialTouchX = null;
	}

	initialTouchX = event.touches[0]?.clientX ?? null;
};

export const onToucheMove = (event: TouchEvent): 'right' | 'left' | null => {
	if (initialTouchX === null || !event.changedTouches[0]) {
		return null;
	}

	const diff = event.changedTouches[0].clientX - initialTouchX;

	if (Math.abs(diff) < SWIPE_MIN_DETECTION) {
		return null;
	}

	if (diff > 0) {
		return 'right';
	} else {
		return 'left';
	}
};

export const onTouchEnd = (event: TouchEvent): 'right' | 'left' | null => {
	const res = onToucheMove(event);

	// reset
	initialTouchX = null;

	return res;
};
