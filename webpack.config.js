const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src');

module.exports = {
  entry: {
    bundle: `${APP_DIR}/app.tsx`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ["@babel/react", "@babel/typescript", ["@babel/env", { "modules": false }]],
        },
      }, {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    static: BUILD_DIR,
    compress: true,
    hot: true,
    port: 9001,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
