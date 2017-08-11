const path = require('path')
    , fs = require('fs')    
    , {tmpdir} = require('os')    
    , {promisify} = require('util')
    , write = promisify(fs.writeFile)
    , {createFile: mktemp} = require('mktemp')
    , resolve = require('resolve')  
    , my = module => resolve.sync(module, {
        basedir: __dirname,
        extensions: ['.js', '.json', '.jsx'],
      })
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
      // activate HMR for React
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9876',
      'webpack/hot/dev-server',
      entryPointFile,
    ])
  const server = new WebpackDevServer(compiler, {    
    host: 'localhost',
    port: 9876,
    stats: 'errors-only',
    historyApiFallback: true, // respond to 404s with index.html  
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
  }).listen(9876, () => console.log(server.address()))
}

const globals = flow(
  ...[
    'Workshop',
    'Concept',
    'Action',
    'Hint',
    'Code',
  ].map(name => ({
    [name]: my(`./components/${name}`)
  }))
)({React: my('react')})

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

const werk = output => rxquire()
  .config(config(output))
  .config(rule({
    test: /\.jsx?$/,
    use: babel,
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.(kubo|mmm)$/,
    use: [babel, 'many-matters/loader'],
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.(jpeg|jpg|png|)$/,
    use: 'url-loader',
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }))
  .config(rule({
    test: /\.(txt|md|markdown)$/,
    use: 'raw-loader',
    exclude: /node_modules/,    
  }))
  // Add our node modules to the search path  
  .config(resolveAll(path.join(__dirname, 'node_modules')))
  // Provide our globals
  .config(plugin(new webpack.ProvidePlugin(globals)))


function main(_node, _index, entry) {
  // werk(entry).exports
  //   .map(index => JSON.stringify(index, 0, 2))
  //   .subscribe(console.log, console.error)
  serve(entry)
}

if (module === require.main) main(...process.argv)