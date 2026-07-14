export const initSelect = function (el = document) {
	const selectHeader = el.querySelectorAll('.select__header');
	const selectItem = el.querySelectorAll('.select__item');

	selectHeader.forEach((item) => {
		item.addEventListener('click', selectToggle);
	});

	selectItem.forEach((item) => {
		item.addEventListener('click', selectChoose);
	});

	// закрытие по клику вне селекта
	document.addEventListener('click', (e) => {
		const allSelects = el.querySelectorAll('.select.is-active');

		allSelects.forEach((select) => {
			if (!select.contains(e.target)) {
				select.classList.remove('is-active');
			}
		});
	});

	function selectToggle(e) {
		e.stopPropagation(); // чтобы клик по хедеру не долетал сразу до document и не закрывал только что открытый select
		this.parentElement.classList.toggle('is-active');
	}

	function selectChoose() {
		const text = this.innerText,
			select = this.closest('.select'),
			currentText = select.querySelector('.select__current');
		currentText.innerText = text;
		select.classList.remove('is-active');

		const input = select.querySelector('input');
		input.value = text;
	}
};
