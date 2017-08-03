const debug = require('debug')('rxquire:webpack')
    , {join} = require('path')
    , flow = require('./flow')

const webpack = module.exports = {
  config,
  compiler,
  watcher,
  source
}

function config(output={
  filename: 'index.js',
  libraryTarget: 'commonjs2'
}) {
  if (typeof output === 'string') {
    output = {filename: output, libraryTarget: 'commonjs2'}
  }
  
  return ({entry}) => ({
    config: {
      target: 'node',
      entry, output,
      devtool: 'inline-source-map',
      resolve: {
        modules: [join(__dirname, 'node_modules'), 'node_modules'],
        extensions: ['.jsx', '.js', '.json'],
      },
      resolveLoader: {
        modules: [join(__dirname, 'node_modules'), 'node_modules'],
        extensions: ['.js', '.json'],
        mainFields: ['loader', 'main']        
      }
    }
  })
}
Object.assign(config, {plugin, target, rule, resolve, resolveLoader, resolveAll})

function target(target) {
  return ({config}) => {
    config.target = target
    return config
  }
}

function plugin(plugin) {
  return ({config}) => ({
    config: flow(({plugins=[]}) => ({plugins: [...plugins, plugin]}))(config)
  })
}

function rule(rule) {
  return ({config}) => ({
    config: flow(({module={}}) => ({
      module: flow(({rules=[]}) => ({
        rules: [...rules, rule],
      }))(module)
    }))(config)
  })
}

function resolve(dir) {
  return ({config}) => ({
    config: flow(({resolve={}}) => ({
      resolve: flow(({modules=[]}) => ({
        modules: [dir, ...modules],
      }))(resolve)
    }))(config)
  })  
}

function resolveLoader(dir) {
  return ({config}) => ({
    config: flow(({resolveLoader={}}) => ({
      resolveLoader: flow(({modules=[]}) => ({
        modules: [dir, ...modules],
      }))(resolveLoader)
    }))(config)
  })  
}

function resolveAll(dir) {
  return x => resolve(dir)(resolveLoader(dir)(x))
}

function compiler(webpack=require('webpack')) {    
  return ({config}) => {
    debug(JSON.stringify(config, 0, 2))    
    return ({
      compiler: webpack(config)
    })
  }
}
compiler.outputFs = outputFs

function outputFs(outputFs) {
  return ({compiler}) => {
    compiler.outputFileSystem = outputFs
    return {outputFs}
  }
}

function watcher(watcher=require('webpack-rx')) {
  return ({compiler}) => ({watcher: watcher(compiler)})
}

function source({outputFs: fs, watcher, compiler: {outputPath}}) {
  return {
    source: watcher.map(
      ({compilation: {assets}}) => Object.assign(
          ...Object.keys(assets)
            .map(file => {
              const path = join(outputPath, file)
                  , content = fs.readFileSync(path, 'utf8')
              return {[file]: {path, content}}
            })
      )
    )  
  }
}