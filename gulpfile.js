import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

import { clean } from './gulp/tasks/clean.js';
import { copy } from './gulp/tasks/copy.js';
import { server } from './gulp/tasks/server.js';
import { html } from './gulp/tasks/html.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { sprite } from './gulp/tasks/sprite.js';
import { scripts } from './gulp/tasks/scripts.js';
import { fonts } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { git } from './gulp/tasks/git.js';

global.app = {
	isProd: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, styles);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.sprite, sprite);
	gulp.watch(path.watch.js, scripts);
	gulp.watch(path.watch.fonts, fonts);
}

const mainTasks = gulp.parallel(copy, html, styles, images, sprite, scripts, fonts);

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);
const deployZip = gulp.series(clean, mainTasks, zip);
const deployFtp = gulp.series(clean, mainTasks, ftp);
const deployGit = gulp.series(clean, mainTasks, git);

export { dev };
export { build };
export { deployZip };
export { deployFtp };
export { deployGit };

gulp.task('default', dev);
