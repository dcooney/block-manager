var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var dir = 'dist';

module.exports = {
	entry: {
		gbm: './src/js/gbm.js',
		'gbm-admin': './src/js/index.js',
		style: './src/style.scss'
	},
	output: {
		path: path.join(__dirname, dir),
		filename: 'js/[name].js'
	},
	watch: true,
	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react']
				}
			},
			{
				test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[ext]',
					publicPath: '../'
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				}),
				exclude: /node_modules/
			}
		]
	},
	plugins: [new ExtractTextPlugin({ filename: 'css/[name].css' })]
};
