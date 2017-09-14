#!/usr/bin/env node

const program = require('commander')
  .version('0.0.1')
  .usage('[-w] [-t themes] [-p port] [path]')
  .option('-t, --theme [themes]', 'Themes', (val, memo) => [...memo, val], [])
  .option('-w, --no-window', 'Do not open a browser window after starting server')
  .option('-p, --port [port]',
    'Serve on <port> (then tries <port + 1>, <port + 2>, etc...)',
    9876)
  .parse(process.argv)

    , path = require('path')
    , fs = require('fs')    
    , {tmpdir} = require('os')    
    , {promisify} = require('util')
    , read = promisify(fs.readFile)
    , write = promisify(fs.writeFile)
    , stat = promisify(fs.stat)
    , {createFile: mktemp} = require('mktemp')
    , resolve = require('resolve')  
    , my = require('./my')
    , webpack = require('webpack')
    , WebpackDevServer = require('webpack-dev-server')
    , open = require('open')
    , createAppJs = require('./createAppJs')
    , createWebpackConfig = require('./createWebpackConfig')

module.exports = {serve, exports}

async function entryPoint(entry) {
  const temp = await mktemp(path.join(tmpdir(), 'XXXXXXXXXX.js'))
  await write(temp, createAppJs(entry, theme))
  return temp
}

async function serve(entry, port=program.port) {
  const entryPointFile = await entryPoint(entry)
      , conf = createWebpackConfig(entryPointFile, port)
      , compiler = webpack(conf)

  const server = new WebpackDevServer(compiler, {    
    host: 'localhost',
    port,
    stats: 'errors-only',
    historyApiFallback: true, // respond to 404s with index.html  
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
    log: x => x,
  }).listen(port, () => {
    const url = `http://localhost:${port}`
    console.log(url)
    if (program.window) open(url)
  }).on('error', err => {
    if (err.code === 'EADDRINUSE') {
      return serve(entry, port + 1)
    }
    console.log(`Kubo couldn't start.`)
    console.log(err)
    process.exit(1)
  })
}

const theme = Object.assign(
  {
    Code: my(`./components/Code/Code`),
    $Text: my(`./components/Markdown`),
  },
  ...[
    'Workshop',
    'Concept',
    'Action',
    'Hint',
  ].map(name => ({
    [name]: my(`./components/${name}`)
  }))
)

for (const themeModule of program.theme) {
  const resolvedTheme = resolve.sync(themeModule, {
    basedir: process.cwd(),
    extensions: ['.js', '.json', '.jsx'],
  })
  const loadedTheme = require(resolvedTheme)
  const themeDir = path.dirname(resolvedTheme)  

  Object.assign(theme,
    ...Object.keys(loadedTheme)
        .map(id => ({
          [id]: resolve.sync(loadedTheme[id], {
            basedir: themeDir,
            extensions: ['.js', '.json', '.jsx'],
          })
        }))
  )
}

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

async function main(kubo) {
  kubo = kubo || await findKubo(kubo)
  if (!kubo) {
    throw `kubo: no materials found in ${process.cwd()}`
  }
  console.log(`Serving ${kubo}`)
  
  serve(path.resolve(kubo))
}

if (module === require.main)
  main(...program.args)
    .catch(err => {
      console.error(err)
      process.exit(1)
    })