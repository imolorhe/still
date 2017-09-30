const webpack = require('webpack');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: './dist/app.bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: './'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "sass-loader" // compiles Sass to CSS
			}]
		},{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
					plugins: [
						'transform-object-rest-spread'
					]
				}
			}
		}]
	}
}
