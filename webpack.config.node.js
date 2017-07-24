var path = require('path');
var webpack = require('webpack');

module.exports = entry => ({
  target: 'node',
  entry, 
  // output: {
  //   filename: 'bundle.js',
  //   // the output bundle

  //   path: path.resolve(__dirname, 'dist'),

  //   publicPath: '/static/'
  //   // necessary for HMR to know where to load the hot update chunks
  // },

  devtool: 'inline-source-map',
  resolve: {extensions: ['.jsx', '.js', '.json']},

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',    
  },

  plugins: [
    // do not emit compiled assets that include errors    
    new webpack.NoEmitOnErrorsPlugin(),

    // Provide globals
    new webpack.ProvidePlugin({
      React: 'react'
    }),
  ],
})
