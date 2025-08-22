import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ['**/*.js', '!assets/**/*.js'],
	},
	{
		plugins: {
			prettier: prettierPlugin,
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
			},
		},
	},
	pluginJs.configs.recommended,
	{
		rules: {
			...prettierConfig.rules,
			'no-console': 'warn',
			'no-alert': 'warn',
			'no-debugger': 'warn',
			'no-var': 'error',
			'prefer-const': 'error',
			'prefer-arrow-callback': 'error',
		},
	},
];
