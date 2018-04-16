module.exports = {
	paths: {
		src: {
			root: './frontend',
			scripts: './frontend/scripts/index.js',
			html: './frontend/html/*.html',
			svg: './frontend/svgs/*.svg',
			static: './frontend/static/**/*'
		},
		dist: './dist',
		watch: {
			scripts: ['./frontend/scripts/**/*.js', './frontend/styles/**/*.scss'],
			html: ['./frontend/html/**/*.html', './frontend/styles/critical.css'],
			svg: './frontend/svgs/*.svg',
			static: './frontend/static/**/*'
		}
	},
	naming: {
		scripts: 'bundle.min.js',
		svgs: 'icons.svg'
	}
}