var path = require('path');

module.exports = {
	entry: './static/js/entry.js',
	output: {
		filename: './static/bundle.js',
	},
	module: {
		loaders: [{
			test: [/\.jsx?$/],
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react'],
				plugins: ['transform-decorators-legacy'],
			}
		}]
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '*']
	}
};