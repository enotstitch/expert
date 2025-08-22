import { header, menuLinks, burgerMenuBtn } from '../vars.js';
import { BURGER_MENU, toggleBurgerMenu } from '../helpers.js';

const closeMenu = () => {
	const isBurgerActive = burgerMenuBtn.classList.contains('burger--active');

	if (isBurgerActive) {
		toggleBurgerMenu(BURGER_MENU.CLOSED);
	}
};

function onMenuLinkClick(event) {
	const menuLink = event.target;
	const linkGoto = menuLink.dataset.goto;

	if (!linkGoto) return;

	const gotoBlock = document.querySelector(linkGoto);

	if (!gotoBlock) return;

	let gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - 15;

	if (window.scrollY > gotoBlockValue) {
		gotoBlockValue -= header.offsetHeight;
	}

	closeMenu();

	window.scrollTo({
		top: gotoBlockValue,
		behavior: 'smooth',
	});

	event.preventDefault();
}

export const initMenuScroll = () => {
	menuLinks.forEach((menuLink) => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});
};
