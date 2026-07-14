import { buildFolder } from '../config/path.js';
import ghpages from 'gh-pages';

export const git = (done) => {
	ghpages.publish(buildFolder, (err) => {
		if (err) console.log('Ошибка деплоя:', err);
		else console.log('Деплой на GitHub Pages успешен!');
		done();
	});
};
