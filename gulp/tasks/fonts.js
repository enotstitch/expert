import ttf2woff2 from 'gulp-ttf2woff2';

export const fonts = async () => {
	await app.gulp
		.src(`${app.path.src.fonts}*.woff2`, { encoding: false })
		.pipe(app.plugins.newer(app.path.build.fonts))
		.pipe(app.gulp.dest(app.path.build.fonts));

	await app.gulp
		.src(`${app.path.src.fonts}*.ttf`, { encoding: false })
		.pipe(
			app.plugins.plumber({
				errorHandler: app.plugins.notify.onError({
					title: 'Fonts',
					message: 'Error: <%= error.message %>',
				}),
			}),
		)
		.pipe(
			app.plugins.newer({
				dest: app.path.build.fonts,
				ext: '.woff2',
			}),
		)
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.path.build.fonts));

	app.plugins.browserSync.stream();
};
