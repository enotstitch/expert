export const initDrag = () => {
	const dropZone = document.querySelector('.drop-zone');
	if (!dropZone) return;

	const dropText = document.querySelector('.drop-zone__text');
	const fileInput = document.getElementById('file-upload');

	// функция обновления текста
	function updateLabel(files) {
		if (files.length > 0) {
			const names = Array.from(files)
				.map((f) => f.name)
				.join(', ');
			dropText.textContent = 'Выбраны: ' + names;
		} else {
			dropText.textContent = 'Перетащите файл(ы) сюда';
		}
	}

	// отменяем дефолт браузера
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
		dropZone.addEventListener(eventName, (e) => {
			e.preventDefault();
			e.stopPropagation();
		});
	});

	// дроп файлов
	dropZone.addEventListener('drop', (e) => {
		const files = e.dataTransfer.files;
		fileInput.files = files; // вставляем в input
		updateLabel(files);
	});

	// выбор через input
	fileInput.addEventListener('change', () => {
		updateLabel(fileInput.files);
	});

	// клик по зоне тоже открывает input
	dropZone.addEventListener('click', () => fileInput.click());
};
