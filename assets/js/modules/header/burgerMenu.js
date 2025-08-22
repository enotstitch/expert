import { mobileWidth, burgerMenuBtn } from '../vars.js';
import { BURGER_MENU, toggleBurgerMenuVisibility, toggleBurgerMenu } from '../helpers.js';

const burgerMenu = () => {
	const screenWidth = window.innerWidth;

	if (screenWidth <= mobileWidth) {
		toggleBurgerMenuVisibility(BURGER_MENU.SHOW);
	} else {
		toggleBurgerMenuVisibility(BURGER_MENU.HIDE);
		toggleBurgerMenu(BURGER_MENU.CLOSED);
	}
};

export const initBurgerMenu = () => {
	document.addEventListener('DOMContentLoaded', burgerMenu);

	window.addEventListener('resize', burgerMenu);

	burgerMenuBtn.addEventListener('click', () => {
		toggleBurgerMenu();
	});
};
