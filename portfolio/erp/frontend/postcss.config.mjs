import babelConfig from './babel.config.js';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: [
        './src/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}',
      ],
      useCSSLayers: false,
      babelConfig: babelConfig,
    },
    autoprefixer: {},
  },
};

export default config;