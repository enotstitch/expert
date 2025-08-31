const formatValue = (num) => (Number.isInteger(num) ? num : +num.toFixed(1));
const formatPrice = (num) => Math.round(num).toLocaleString('ru-RU');

const UNITS = {
	count: 'шт.',
	square: 'м²',
	weight: 'кг.',
	volume: 'м³',
	price: 'руб.',
};

const updateInputs = (calc, currentInput) => {
	const inputs = {
		count: calc.querySelector('input[name="count"]'),
		square: calc.querySelector('input[name="square"]'),
		weight: calc.querySelector('input[name="weight"]'),
		volume: calc.querySelector('input[name="volume"]'),
		price: calc.querySelector('input[name="price"]'),
	};

	const CHARS = {
		PRICE: +calc.dataset.price,
		WEIGHT: +calc.dataset.weight,
		SQUARE: +calc.dataset.width * +calc.dataset.lenght,
		VOLUME: +calc.dataset.width * +calc.dataset.lenght * +calc.dataset.height,
	};

	// определяем count по текущему значению dataset
	let count = 0;
	switch (currentInput) {
		case 'count':
			count = +inputs.count.dataset.value || 0;
			break;
		case 'square':
			count = (+inputs.square.dataset.value || 0) / CHARS.SQUARE;
			break;
		case 'weight':
			count = (+inputs.weight.dataset.value || 0) / CHARS.WEIGHT;
			break;
		case 'volume':
			count = (+inputs.volume.dataset.value || 0) / CHARS.VOLUME;
			break;
		case 'price':
			count = (+inputs.price.dataset.value || 0) / CHARS.PRICE;
			break;
		default:
			return;
	}

	// сохраняем чистые значения в dataset
	inputs.count.dataset.value = count;
	inputs.square.dataset.value = count * CHARS.SQUARE;
	inputs.weight.dataset.value = count * CHARS.WEIGHT;
	inputs.volume.dataset.value = count * CHARS.VOLUME;
	inputs.price.dataset.value = count * CHARS.PRICE;

	// обновляем все поля, только если они не в фокусе
	Object.keys(inputs).forEach((key) => {
		const input = inputs[key];
		if (document.activeElement !== input) {
			let val;
			if (key === 'count') {
				val = Math.ceil(+input.dataset.value); // всегда целое, округлённое вверх
			} else if (key === 'price') {
				val = formatPrice(+input.dataset.value);
			} else {
				val = formatValue(+input.dataset.value);
			}
			input.value = `${val} ${UNITS[key]}`;
		}
	});
};

export const initCalc = () => {
	const calc = document.querySelector('.calc');
	if (!calc) return;

	const inputs = calc.querySelectorAll('.calc__input');

	inputs.forEach((input) => {
		const key = input.name;

		// инициализация dataset.value при загрузке
		const initial = parseFloat(input.value) || 0;
		input.dataset.value = initial;

		// показываем подпись изначально
		if (key === 'price') {
			input.value = `${formatPrice(initial)} ${UNITS[key]}`;
		} else {
			input.value = `${formatValue(initial)} ${UNITS[key]}`;
		}

		// при фокусе убираем подпись, но показываем уже округлённое число
		input.addEventListener('focus', () => {
			if (key === 'price') {
				input.value = formatPrice(+input.dataset.value);
			} else if (key === 'count') {
				input.value = Math.ceil(+input.dataset.value); // округляем вверх
			} else {
				input.value = formatValue(+input.dataset.value);
			}
		});
		// при уходе с поля показываем подпись
		input.addEventListener('blur', () => updateInputs(calc, key));

		// при вводе сохраняем значение в dataset и пересчитываем
		input.addEventListener('input', () => {
			// оставляем только цифры и точку
			input.value = input.value.replace(/[^0-9.]/g, '').replace(/^(\d+)\.(\d{0,1}).*$/, '$1.$2'); // максимум 1 цифра после точки

			// сохраняем значение в dataset
			let val = parseFloat(input.value.replace(/\s/g, '')) || 0;

			// если поле count — округляем в большую сторону
			if (key === 'count') {
				val = Math.ceil(val);
				input.value = val; // сразу показываем целое число при вводе
			}

			input.dataset.value = val;

			// пересчитываем все поля
			updateInputs(calc, key);
		});
	});
};
