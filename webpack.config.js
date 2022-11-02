const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require("dotenv-webpack");

module.exports = (env, options) => {
  return {
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    entry: './src/main.js',
    output: {
      //path: '',
      //filename: 'main.js',
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          // 이미지 포멧: PNG, JP(E)G, GIF, SVG, WEBP
          test: /\.png$/i,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: './src/index.html',
      }),
      new CopyPlugin({
        patterns: [{ from: 'assets', to: '' }],
      }),
      new Dotenv({
        systemvars: true,
      }),
    ],
    devServer: {
      port: 8080,
      open: true,
      historyApiFallback: true,
    },
  };
};
