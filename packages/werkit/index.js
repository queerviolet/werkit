const path = require('path')
    , fs = require('fs')    
    , {tmpdir} = require('os')    
    , {promisify} = require('util')
    , write = promisify(fs.writeFile)
    , {createFile: mktemp} = require('mktemp')
    , webpack = require('webpack')
    , WebpackDevServer = require('webpack-dev-server')
    , rxquire = require('rxquire')    
    , {config} = require('rxquire/webpack')
    , {plugin, rule, resolveAll, target} = config
    , flow = require('rxquire/flow')

module.exports = {serve, exports}

const entryPointSrc = entry => `
  import {render} from 'react-dom'
  import Root from '${entry}'
  console.log(Root, Workshop, Concept, Action)
  console.log(Root())
  render(<Root/>, main)
`

async function entryPoint(entry) {
  const temp = await mktemp(path.join(tmpdir(), 'XXXXXXXXXX.js'))
  await write(temp, entryPointSrc(entry))
  return temp
}

async function serve(entry) {
  const resolvedEntryPoint = path.resolve(entry)
  const entryPointFile = await entryPoint(resolvedEntryPoint)
  console.log(entryPointFile)

  const {compiler} = werk({filename: 'index.js'})
    .config(target('web'))
    .config(plugin(new webpack.HotModuleReplacementPlugin))  // enable HMR globally
    .config(plugin(new webpack.NamedModulesPlugin))          // Better module names in the browser
                                                             // console on HMR updates
    .config(plugin(new webpack.NoEmitOnErrorsPlugin))        // Don't emit on errors.
    ([
      'react-hot-loader/patch',                          // activate HMR for React
      'webpack-dev-server/client?http://localhost:9876',
      'webpack/hot/dev-server',
      entryPointFile,
    ])
  const server = new WebpackDevServer(compiler, {    
    host: 'localhost',
    port: 9876,
    stats: {colors: true},
    historyApiFallback: true, // respond to 404s with index.html  
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
  }).listen(9876, () => console.log(server.address()))
}

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

const werkitModules = path.join(__dirname, 'node_modules')
const my = module => path.join(werkitModules, module)

const werk = output => rxquire()
  .config(config(output))
  .config(rule({
    test: /\.jsx?$/,
    use: {
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
    },
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.(jpeg?|png|)$/,
    use: 'url-loader',
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.css$/,
    use: [ 'style-loader', 'css-loader' ]
  }))
  .config(rule({
    test: /\.(txt|md|markdown)$/,
    use: 'raw-loader',
    exclude: /node_modules/,    
  }))
  .config(resolveAll(werkitModules))
  .config(plugin(new webpack.ProvidePlugin(globals)))

function main(_node, _index, entry) {
  // werk(entry).exports
  //   .map(index => JSON.stringify(index, 0, 2))
  //   .subscribe(console.log, console.error)
  serve(entry)
}

if (module === require.main) main(...process.argv)