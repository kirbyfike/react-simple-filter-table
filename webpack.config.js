var path = require('path')
var webpack = require('webpack')

var build = {
  entry: [
    './example/'
  ],
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
