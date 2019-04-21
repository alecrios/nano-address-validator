const path = require('path');
const {env} = require('yargs').argv;

const libraryName = 'nano-address-validator';

let outputFile;
let mode;

if (env === 'build') {
	mode = 'production';
	outputFile = `${libraryName}.min.js`;
} else {
	mode = 'development';
	outputFile = `${libraryName}.js`;
}

const config = {
	mode,
	entry: `${__dirname}/src/index.js`,
	devtool: 'source-map',
	output: {
		path: `${__dirname}/lib`,
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		modules: [path.resolve('./node_modules'), path.resolve('./src')],
		extensions: ['.json', '.js'],
	},
};

module.exports = config;
