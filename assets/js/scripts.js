import { initHeader } from './modules/header/header.js';
import { initDrag } from './scripts/drag.js';
import { initSelect } from './scripts/select.js';
import { initFormDetails } from './scripts/formDetails.js';
import { initCatalogShowMore } from './scripts/catalogShowMore.js';
import { initCalc } from './scripts/calc.js';
import './modules/modal/modal.js';
import './scripts/sidebar.js';

initHeader();
initCatalogShowMore();
initDrag();
initSelect();
initFormDetails();
initCalc();

let resizeTimeout;

window.addEventListener('resize', () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		initCatalogShowMore();
	}, 100);
});
