const path = require('path')
    , webpack = require('webpack')
    , WebpackDevServer = require('webpack-dev-server')
    , load = require('./webpack-to-memory')

function compile(entry, target='web') {
  return webpack(require(`./webpack.config.${target}`)(entry))
}

function serve(entry) {
  new WebpackDevServer(compile(entry), {
    host: 'localhost',
    port: 3000,
    stats: {colors: true},

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  }).listen((...args) => console.log(args))
}

function main(_node, _index, entry) {
 load(compile(entry, 'node'))
    .map(files => files['index.js'])
    .map(({default: index}) => JSON.stringify(index, 0, 2))
    .subscribe(console.log, console.error)
}

if (module === require.main) main(...process.argv)