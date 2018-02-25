const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

var config = {
	output: {
		path: path.resolve(__dirname + '/dist/'),
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: __dirname,
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				loader: 'style!scss!css',
			},
		],
	},
	plugins: [
		new UglifyJsPlugin({
			sourceMap: false,
			uglifyOptions: {
				mangle: true,
				compress: {
					warnings: false,
				},
			},
		}),
	],
};

module.exports = [
	merge(config, {
		entry: path.resolve(__dirname + '/src/plugin.js'),
		output: {
			filename: 'skyvideo.min.js',
			libraryTarget: 'window',
			library: 'SkyVideo',
		},
	}),
	merge(config, {
		entry: path.resolve(__dirname + '/src/SkyVideo.vue'),
		output: {
			filename: 'skyvideo.js',
			libraryTarget: 'umd',
			library: 'SkyVideo',
			umdNamedDefine: true,
		},
	}),
];
