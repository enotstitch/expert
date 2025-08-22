import { initBurgerMenu } from './burgerMenu.js';
import { initMenuScroll } from './menuScroll.js';
import { initStickyHeader } from './stickyHeader.js';

export const initHeader = () => {
	initBurgerMenu();
	initMenuScroll();
	initStickyHeader();
};
