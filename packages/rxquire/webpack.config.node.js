var path = require('path');
var webpack = require('webpack');

module.exports = filename => ({entry}) => ({
  config: {
    target: 'node',
    entry, 

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
      filename,
      libraryTarget: 'commonjs2',    
    },

    plugins: [
      // Provide globals
      new webpack.ProvidePlugin({
        React: 'react',
        Workshop: './components/Workshop',
        Concept: './components/Concept',      
        Action: './components/Action',
      }),
    ],
  }
})
