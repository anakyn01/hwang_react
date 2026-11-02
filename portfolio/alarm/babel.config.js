const path = require('path');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: dev,
        test: process.env.NODE_ENV === 'test',
        runtimeInjection: false,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    ],
  ],
};