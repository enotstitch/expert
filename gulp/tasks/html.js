import htmlmin from 'gulp-htmlmin';
import typograf from 'gulp-typograf';
import panini from 'panini';

export const html = () => {
	panini.refresh();
	return app.gulp
		.src(app.path.src.html)
		.pipe(
			app.plugins.plumber({
				errorHandler: app.plugins.notify.onError({
					title: 'HTML',
					message: 'Error: <%= error.message %>',
				}),
			}),
		)
		.pipe(
			panini({
				root: './assets/html/',
				layouts: './assets/html/layouts/',
				partials: './assets/html/partials/',
				helpers: './assets/html/helpers/',
				data: './assets/html/data/',
			}),
		)
		.pipe(
			typograf({
				locale: ['ru', 'en-US'],
				disableRule: ['ru/other/phone-number'],
				htmlEntity: {
					type: 'name',
				},
			}),
		)
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(
			app.plugins.if(
				app.isProd,
				app.plugins.size({
					title: 'До сжатия HTML',
				}),
			),
		)
		.pipe(
			app.plugins.if(
				app.isProd,
				htmlmin({
					collapseWhitespace: true,
				}),
			),
		)
		.pipe(
			app.plugins.if(
				app.isProd,
				app.plugins.size({
					title: 'После сжатия HTML',
				}),
			),
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browserSync.stream());
};
