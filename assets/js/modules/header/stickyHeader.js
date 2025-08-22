import { header } from '../vars.js';

const isStickyHeader = header.classList.contains('header--sticky');

const HEADER_STATE = {
	INIT: 'init',
	HIDE: 'hide',
	SHOW: 'show',
};

const changeHeaderState = (state) => {
	if (state === HEADER_STATE.SHOW) {
		header.style.top = 0;
	} else {
		header.style.top = `-${header.offsetHeight}px`;
	}
};

const observeHeaderResize = () => {
	const resizeObserver = new ResizeObserver(() => {
		changeHeaderState(HEADER_STATE.INIT);
	});

	resizeObserver.observe(header);
};

const stickyHeader = () => {
	let lastScrollY = window.scrollY;
	let currentScrollDirection = null;

	observeHeaderResize();

	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY;
		const newScrollDirection = currentScrollY < lastScrollY ? 'up' : 'down';

		if (currentScrollY === 0) {
			changeHeaderState(HEADER_STATE.INIT);
			return;
		}

		if (newScrollDirection !== currentScrollDirection) {
			currentScrollDirection = newScrollDirection;

			if (currentScrollY > header.offsetHeight) {
				if (newScrollDirection === 'up') {
					changeHeaderState(HEADER_STATE.SHOW);
				} else {
					changeHeaderState(HEADER_STATE.HIDE);
				}
			}
		}

		lastScrollY = currentScrollY;
	});
};

export const initStickyHeader = () => {
	if (isStickyHeader) {
		stickyHeader();
	}
};
