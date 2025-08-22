import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

export const buildFolder = `./build`;
export const srcFolder = `./assets`;

export const path = {
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/`,
	},

	src: {
		html: `${srcFolder}/html/*.html`,
		scss: `${srcFolder}/scss/*.{scss,sass,css}`,
		js: `${srcFolder}/js/scripts.js`,
		images: `${srcFolder}/resources/img/`,
		sprite: `${srcFolder}/resources/img/svg/*.svg`,
		fonts: `${srcFolder}/resources/fonts/`,
		files: `${srcFolder}/resources/files/**/*.*`,
	},

	watch: {
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/**/*.{scss,sass,css}`,
		js: `${srcFolder}/**/*.js`,
		images: [
			`${srcFolder}/resources/img/**/*.{jpg,jpeg,png,webp,svg,gif}`,
			`!${srcFolder}/resources/img/svg/**/*`,
		],
		sprite: `${srcFolder}/resources/img/svg/*.svg`,
		fonts: `${srcFolder}/resources/fonts/`,
		files: `${srcFolder}/resources/files/**/*.*`,
	},

	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `${rootFolder}_infocoder_ru/public_html`, // * Папка на хостинге
};
