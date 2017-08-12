const path = require('path')
    , fs = require('fs')    
    , {tmpdir} = require('os')    
    , {promisify} = require('util')
    , read = promisify(fs.readFile)
    , write = promisify(fs.writeFile)
    , stat = promisify(fs.stat)
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
    , {plugin, rule, resolveExt, resolveAll, target} = config
    , flow = require('rxquire/flow')

module.exports = {serve, exports}


const entryPointSrcRaw = entry => `
  import {render} from 'react-dom'
  import App from ${entry}
  
  const run = Component =>
    render(<Component/>, main)
  
  run(App)

  if (module.hot)
    module.hot.accept(${entry}, () => run(App))
`

const entryPointSrc = raw => entryPointSrcRaw(JSON.stringify(raw))

async function entryPoint(entry) {
  const temp = await mktemp(path.join(tmpdir(), 'XXXXXXXXXX.js'))
  await write(temp, entryPointSrc(entry))
  return temp
}

async function serve(entry, port=9876) {
  const entryPointFile = await entryPoint(entry)

  const {compiler} = werk({filename: 'index.js'})
    .config(target('web'))
    .config(plugin(new webpack.HotModuleReplacementPlugin))  // enable HMR globally
    .config(plugin(new webpack.NamedModulesPlugin))          // Better module names in the browser
                                                             // console on HMR updates
    .config(plugin(new webpack.NoEmitOnErrorsPlugin))        // Don't emit on errors.
    ([
      // activate HMR for React
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/dev-server',
      entryPointFile,
    ])
  const server = new WebpackDevServer(compiler, {    
    host: 'localhost',
    port,
    stats: 'errors-only',
    historyApiFallback: true, // respond to 404s with index.html  
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
    log: x => x,
  }).listen(port, () => console.log(`http://localhost:${port}`))
}

const globals = flow(
  ...[
    'Workshop',
    'Concept',
    'Action',
    'Hint',
  ].map(name => ({
    [name]: my(`./components/${name}`)
  }))
)({
  React: my('react'),
  Code: my(`./components/Code/Code`),
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

const werk = output => rxquire()
  .config(config(output))
  .config(resolveExt('.kubo'))
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

const lookup = (file, parser=JSON.parse) =>
  async function(entry=process.cwd()) {
    let p = path.join(entry, file)
    do {
      try {
        const dir = path.dirname(p)
        return {
          file: p,
          dir,
          data: parser(await read(p)),
          resolve: (...paths) => path.resolve(dir, ...paths)
        }
      } catch(x) {
        console.log(p, x)
        if (p !== path.join('/', file))
          p = path.join(path.dirname(path.dirname(p)), file)
        else
          p = null
      }
    } while (p)
  }

const package = lookup('package.json')

async function findKubo(entry) {
  if (!entry) {
    const pkg = await package()
    if (typeof pkg.data.kubo === 'string') {
      return pkg.resolve(pkg.data.kubo)
    }
    try {
      const dotKubo = pkg.resolve('.kubo')
      await stat(dotKubo)
      return dotKubo
    } catch (x) {
      /* drat */
      return null
    }    
  }
  return entry
}

async function main(_node, _index, kubo) {
  kubo = kubo || await findKubo(kubo)
  if (!kubo) {
    throw `kubo: no materials found in ${process.cwd()}`
  }
  console.log(`Serving ${kubo}`)
  
  serve(path.resolve(kubo))
}

if (module === require.main)
  main(...process.argv)
    .catch(err => {
      console.error(err)
      process.exit(1)
    })