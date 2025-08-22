import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
const isDev = !process.argv.includes('--build');

export default {
	entry: './assets/js/scripts.js',
	output: {
		filename: 'scripts.min.js',
		path: path.resolve('./build/js'),
	},
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'source-map' : false,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: false,
					mangle: false,
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},
	module: {
		rules: [],
	},
};
