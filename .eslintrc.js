module.exports = {
	'env': {
		'browser': true,
		'es6': true,
	},
	'extends': [
		'eslint:recommended',
		'airbnb-base',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
	},
	'plugins': ['@typescript-eslint'],
	'rules': {
		'arrow-body-style': 0,
		'arrow-parens': ['warn', 'always'],
		'eol-last': ['error', 'always'],
		'indent': ['error', 'tab', {'SwitchCase': 1}],
		'no-confusing-arrow': ['error', {'allowParens': true}],
		'no-new': 0,
		'no-param-reassign': ['error', {'props': false}],
		'no-tabs': 0,
		'no-unused-expressions': [2, {'allowTernary': true}],
		'operator-assignment': 0,
		'prefer-destructuring': 0,
		'quote-props': ['warn', 'consistent'],
	},
	'settings': {
		'import/resolver': {
			'node': {
				'extensions': ['.js', '.ts'],
			},
		},
	},
};
