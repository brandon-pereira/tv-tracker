require('dotenv').config();
const config = require('./config');
const webpack = require('webpack');

const getPlugins = () => {
	const plugins = [
		new webpack.optimize.ModuleConcatenationPlugin(), // scope hoisting
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
			DEBUG: false,
			VAPID_PUBLIC_KEY: null
		})
	]
	
	if (!process.env.NODE_ENV === "production") {
		plugins.push(new webpack.SourceMapDevToolPlugin());
	}
	
	return plugins;
}


module.exports = {
	entry: ['babel-polyfill', config.paths.src.scripts],
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	output: {
		publicPath: 'scripts/', // relative path
		filename: config.naming.scripts
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [["env", {
								"targets": {
								"browsers": ["last 2 versions"]
							}
						}], "stage-0", "react"],
						plugins: [
							"transform-decorators-legacy", // for mobx decorators
							"transform-decorators",
							"transform-react-jsx", // for jsx
							"add-module-exports", // export default will allow you to import without typing .default
							"dynamic-import-webpack" // for import()
						]
					}
				}]
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},
	plugins: getPlugins()
}
