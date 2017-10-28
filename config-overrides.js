var webpack = require('webpack');

module.exports = function override(config, env) {
	config.plugins.push(
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
			// In case you imported plugins individually, you must also require them here:
			// Util: "exports-loader?Util!bootstrap/js/dist/util",
			// Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
		})
	)
	return config;
}