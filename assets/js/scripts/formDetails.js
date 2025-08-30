import { initSelect } from './select.js';

const isValid = (row) => {
	const inputs = row.querySelectorAll('input');
	let isValid = true;

	inputs.forEach((input) => {
		if (!input.required || input.value) return;

		input.classList.add('error');
		isValid = false;

		input.addEventListener('input', () => {
			input.classList.remove('error');
		});
	});

	return isValid;
};

const serialize = () => {
	//* Пространство имён для подписей
	const name = {
		type: 'Тип / Декор',
		thickness: 'Толщина',
		length: 'Длина по волокнам (мм)',
		edge1: 'Кромка',
		width: 'Ширина поперек волокон (мм)',
		edge2: 'Кромка',
		count: 'Кол-во',
		square: 'Площадь (кв.м)',
		comment: 'Примечание',
	};

	//* Textarea для отправки
	const outputTextarea = document.querySelector('.form-details__output');
	outputTextarea.value = '';

	//* Счётчики
	const pieceCounter = document.querySelector('.form-details-item__output--piece');
	const squareCounter = document.querySelector('.form-details-item__output--square');

	const tableBody = document.querySelector('.form-details-table__body');
	const rows = tableBody.querySelectorAll('.form-details-table__row');
	let rowCounter = 1;

	rows.forEach((row) => {
		//* Все инпуты
		const inputs = row.querySelectorAll('input');

		outputTextarea.value += `Деталь №${rowCounter}:\n`;
		inputs.forEach((input) => {
			outputTextarea.value += `${name[input.name]}: ${input.value || '—'}\n`;
		});
		outputTextarea.value += `\n`;
		rowCounter++;
	});

	outputTextarea.value += `\nДеталей в заказе: ${pieceCounter.textContent} шт.\nОбщая площадь: ${squareCounter.textContent} м²`;
};

export const initFormDetails = () => {
	const section = document.querySelector('.form-details');
	if (!section) return;

	//* Таблица
	const table = section.querySelector('.form-details-table');
	const tableBody = table.querySelector('.form-details-table__body');
	const row = tableBody.querySelector('.form-details-table__row');
	const addRowBtn = section.querySelector('.form-details-item__btn');

	//* Кнопка сабмита
	const submitBtn = section.querySelector('.form-details__submit');

	//* Счетчики
	const pieceCounter = section.querySelector('.form-details-item__output--piece');
	const squareCounter = section.querySelector('.form-details-item__output--square');

	const validate = (row) => {
		//* Ячейки
		const edgeInput1 = row.querySelector('input[name="edge1"]');
		const edgeInput2 = row.querySelector('input[name="edge2"]');
		const countInput = row.querySelector('input[name="count"]');
		const squareInput = row.querySelector('input[name="square"]');

		//* Валидация
		const numInputs = row.querySelectorAll('input[data-num]');

		numInputs.forEach((input) => {
			input.addEventListener('input', () => {
				input.value = input.value
					.replace(/[^0-9.]/g, '') // убираем всё кроме цифр и точки
					.replace(/^(\d+)\.(\d{0,2}).*$/, '$1.$2'); // максимум 2 цифры после точки
			});
		});

		//* Значения по умолчанию
		countInput.value = 1;
		countInput.textContent = 1;
		edgeInput1.value = '2,0 мм';
		edgeInput2.value = '2,0 мм';

		squareInput.addEventListener('input', () => {
			const squareInputs = table.querySelectorAll('input[name="square"]');
			squareCounter.textContent = '0.00';
			squareInputs.forEach((input) => {
				const value = input.value;
				squareCounter.textContent = (+squareCounter.textContent + +value).toFixed(2);
			});
		});

		countInput.addEventListener('input', () => {
			const countInputs = table.querySelectorAll('input[name="count"]');
			pieceCounter.textContent = 0;
			countInputs.forEach((input) => {
				const value = input.value;
				pieceCounter.textContent = +pieceCounter.textContent + +value;
			});
		});
	};

	validate(row);

	addRowBtn.addEventListener('click', () => {
		const rows = tableBody.querySelectorAll('.form-details-table__row');
		const lastRow = rows[rows.length - 1];
		if (!isValid(lastRow)) return;

		const newRow = row.cloneNode(true);
		const inputs = newRow.querySelectorAll('input');
		const selectCurrents = newRow.querySelectorAll('.select__current');

		//* Значения по умолчанию
		inputs.forEach((input) => {
			input.value = '';
		});
		selectCurrents.forEach((current) => {
			current.textContent = '2,0 мм';
		});

		tableBody.appendChild(newRow);
		pieceCounter.textContent = +pieceCounter.textContent + 1;

		validate(newRow);
		initSelect(newRow);
		serialize();
	});

	submitBtn.addEventListener('click', () => {
		serialize();
	});
};
