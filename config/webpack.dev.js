const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const DotenvPlugin = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, '../app/build'),
    historyApiFallback: true,
    index: 'index.html',
    open: true,
    port: 3000
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    // injects any variables set in .env.dev into process.env.<varname>
    new DotenvPlugin({
      path: path.join(__dirname, '../.env.dev'),
      systemvars: true // any existing environment variables already set take precedence
    })
  ]
});
