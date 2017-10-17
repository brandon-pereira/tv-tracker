var path = require('path');

module.exports = {
	// watch: true,
	// target: 'electron-renderer',
  entry: './scripts/app.js',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'app.js'
  },
	module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
          "presets": ["es2015", "stage-0", "react"],
          "plugins": ["transform-decorators-legacy", "transform-decorators"]
        }
      },
			{
       test: /\.scss$/,
       loaders: ["style-loader", "css-loader", "sass-loader"]
     }
    ]
	}
};