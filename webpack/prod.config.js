var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var config = require('../webpack.config.js');

config.watch = false;
config.entry = {
	gbm: './src/js/gbm.js',
	'gbm-admin.min': './src/js/index.js',
};

config.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"',
		},
	})
);
module.exports = config;
