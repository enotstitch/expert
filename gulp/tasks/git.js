import { buildFolder } from '../config/path.js';
import ghPages from 'gulp-gh-pages';

export const git = () => {
	return app.gulp.src(`${buildFolder}/**/*.*`, { encoding: false }).pipe(ghPages());
};
