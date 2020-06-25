const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const BUILD_DIR = '../app/build/renderer';
const STATIC_WWW_DIR = '../app/static_www';

module.exports = {
  entry: {
    renderer: path.resolve(__dirname, '../app/src/index.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, BUILD_DIR),
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, STATIC_WWW_DIR),
        to: path.join(__dirname, BUILD_DIR)
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, STATIC_WWW_DIR, 'index.html'),
      title: 'index.html',
      minify: true
    }),
    new webpack.DefinePlugin({
      global: 'window'
    }),
    new MomentLocalesPlugin()
  ],
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', ['@babel/preset-env', { targets: { node: 'current' } }]],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.ts$|\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].v-[hash].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].v-[hash].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
};
