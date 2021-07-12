// webpack config
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'spy.js',
    publicPath: process.env.BASE_URL
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { babelrc: true }
          },
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: (element) => {
                const append = () => document.head.append(element);
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', append);
                } else {
                  append();
                }
              }
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  devtool: 'inline-source-map'
};
