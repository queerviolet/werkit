const path = require('path')
    , webpack = require('webpack')
    , WebpackDevServer = require('webpack-dev-server')
    , rxquire = require('rxquire')
    , targets = {
      web: require('./webpack.config.web'),
    }

module.exports = {serve, exports}

function compile(entry, target=targets.web) {
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

const {config: {plugin}} = require('rxquire/webpack')
    , flow = require('rxquire/flow')
    , {resolve} = require

const components = (...components) => Object.assign(
  ...components.map(name => ({
    [name]: require.resolve(`./components/${name}.jsx`)
  }))
)

const globals = flow(
    {React: 'react'},
    components('Workshop',
               'Concept',
               'Action'))()

const werk = entry =>  
  rxquire()
    .config(plugin(new webpack.ProvidePlugin(globals)))
    (entry)

function main(_node, _index, entry) {
  werk(entry)
    .map(index => JSON.stringify(index, 0, 2))
    .subscribe(console.log, console.error)
}

if (module === require.main) main(...process.argv)