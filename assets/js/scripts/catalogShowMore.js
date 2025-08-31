export const initCatalogShowMore = () => {
	const catalog = document.querySelector('.catalog');

	if (!catalog) return;

	const catalogCards = catalog.querySelectorAll('.catalog-card');
	const catalogShowBtn = document.querySelector('#catalogShowBtn');

	if (!catalogShowBtn) return;

	const cardsLength = catalogCards.length;
	const screenWidth = window.innerWidth;
	const isMobile = screenWidth <= 576;

	const visibleCount = isMobile ? 6 : 7;

	if (cardsLength > visibleCount) {
		catalogShowBtn.classList.remove('is-hidden');
	} else {
		catalogShowBtn.classList.add('is-hidden');
	}

	catalogCards.forEach((card, index) => {
		card.classList.toggle('is-hidden', index >= visibleCount);
	});

	catalogShowBtn.onclick = () => {
		catalogCards.forEach((card) => card.classList.remove('is-hidden'));
		catalogShowBtn.classList.add('is-hidden');
	};
};
