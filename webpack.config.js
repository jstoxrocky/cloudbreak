var path = require('path');

module.exports = {
	entry: './static/js/app.js',
	output: {
		filename: './static/bundle.js',
	},
	module: {
		loaders: [{
			test: [/\.jsx?$/],
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '*']
	}
};