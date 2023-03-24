const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { webpack } = require('webpack');
module.exports = {
  entry: './src/index.js',
  
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather App',
      filename:'index.html',
      template: 'src/template.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  }, 

};