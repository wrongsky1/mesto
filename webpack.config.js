
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    
module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env',
                    {'plugins': ['@babel/plugin-proposal-class-properties']}]
              }, 
            exclude: '/node_modules/'
          },
          {
            test: /\.css$/,
            loader: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              'postcss-loader'
            ],
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            test: /\.(png|svg|jpg|gif|woff2|woff)$/,
            loader: 'file-loader',
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        }),
        new MiniCssExtractPlugin()
      ]
    };