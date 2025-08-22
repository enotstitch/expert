import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = async () => {
	await app.gulp
		.src(`${app.path.src.images}**/*.webp`, { encoding: false })
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(app.gulp.dest(app.path.build.images));

	await app.gulp
		.src(`${app.path.src.images}**/*.{jpg,jpeg,png}`, { encoding: false })
		.pipe(
			app.plugins.plumber({
				errorHandler: app.plugins.notify.onError({
					title: 'Images',
					message: 'Error: <%= error.message %>',
				}),
			}),
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.images));

	return app.gulp
		.src([`${app.path.src.images}**/*.{gif,svg}`, `!${app.path.src.images}svg/**/*`], {
			encoding: false,
		})
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(
			app.plugins.if(
				app.isProd,
				imagemin({
					progressive: true,
					optimizationLevel: 3,
					verbose: true,
				}),
			),
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browserSync.stream());
};
