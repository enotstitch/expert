import { body, menuBody, menuList, burgerMenuBtn } from './vars.js';

export const BURGER_MENU = {
	OPEN: true,
	CLOSED: false,
	SHOW: true,
	HIDE: false,
};

export const toggleBurgerMenuVisibility = (state) => {
	burgerMenuBtn.classList.toggle('burger--visible', state);
	menuBody.classList.toggle('menu__body--mobile', state);
	menuList.classList.toggle('menu__list--mobile', state);
};

export const toggleBurgerMenu = (state) => {
	body.classList.toggle('lock', state);
	burgerMenuBtn.classList.toggle('burger--active', state);
	menuBody.classList.toggle('menu__body--active', state);
};
