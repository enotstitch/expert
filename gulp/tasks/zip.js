import { deleteAsync } from 'del';
import gulpZip from 'gulp-zip';

export const clean = async () => {
	await deleteAsync(app.path.clean);
};

export const zip = () => {
	deleteAsync(`./${app.path.rootFolder}.zip`);
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`)
		.pipe(
			app.plugins.plumber({
				errorHandler: app.plugins.notify.onError({
					title: 'ZIP',
					message: 'Error: <%= error.message %>',
				}),
			}),
		)
		.pipe(gulpZip(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'));
};
