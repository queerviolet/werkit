const path = require('path')
    , webpack = require('webpack')
    , my = require('./my')

module.exports = entry => ({
  target: 'web',
  entry: 
   [ 'react-hot-loader/patch',
     'webpack-dev-server/client?http://localhost:9876',
     'webpack/hot/dev-server',
     entry ],
  output: {filename: 'index.js'},
  devtool: 'inline-source-map',
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      'node_modules'
    ],
    extensions: [ '.mmm', '.kubo', '.jsx', '.js', '.json' ],
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules'),
      'node_modules'
    ],
    extensions: [ '.js', '.json' ],
    // mainFields: [ 'loader', 'main' ],
    // unsafeCache: true,
    // mainFiles: [ 'index' ],
    // cacheWithContext: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: babel,
        exclude: /node_modules/,
      },
      {
        test: /\.(kubo|mmm)$/,
        use: [babel, 'many-matters/loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpeg|jpg|png|)$/,
        use: 'url-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(txt|md|markdown)$/,
        use: 'raw-loader',
        exclude: /node_modules/,    
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: 'glslify-loader',
      }      
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin,  // enable HMR globally
    new webpack.NamedModulesPlugin,          // Better module names in the browser
                                              // console on HMR updates
    new webpack.NoEmitOnErrorsPlugin,        // Don't emit on errors.
  ],
  cache: true,
})

const babel = {
  loader: 'babel-loader',
  options: {
    "presets": [
      [my('babel-preset-es2015'), {modules: false}],
      my('babel-preset-stage-2'),
      my('babel-preset-react')
    ],
    "plugins": [
      my('react-hot-loader/babel')
    ]
  },
}