const babelConfig = require('./babel.config');

module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
      useCSSLayers: true,
      babelConfig: babelConfig,
    },
    autoprefixer: {},
  },
};