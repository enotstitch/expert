import { initHeader } from './modules/header/header.js';
import { initDrag } from './scripts/drag.js';
import { initSelect } from './scripts/select.js';
import { initFormDetails } from './scripts/formDetails.js';
import { initCatalogShowMore } from './scripts/catalogShowMore.js';
import './modules/modal/modal.js';
import './scripts/sidebar.js';

initHeader();
initCatalogShowMore();
initDrag();
initSelect();
initFormDetails();

window.addEventListener('resize', () => {
	initCatalogShowMore();
});
