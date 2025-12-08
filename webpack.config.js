const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...(typeof defaultConfig.entry === 'function'
			? defaultConfig.entry()
			: defaultConfig.entry || {}),
		'block-manager': path.resolve(__dirname, 'src/js/block-manager.js'),
		'block-manager-admin': path.resolve(__dirname, 'src/js/admin.js'),
	},

	externals: {
		...(defaultConfig.externals || {}),
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
