const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "./dist/app.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: './dist/app.bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: './'
	},
	devtool: process.env.NODE_ENV === "development" ? "source-map": false,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		extractSass
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: extractSass.extract({
				use: [{
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}],
				fallback: "style-loader" // creates style nodes from JS strings in development
			})
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
