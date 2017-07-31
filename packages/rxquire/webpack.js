const {join} = require('path')
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
      resolve: {extensions: ['.jsx', '.js', '.json']},

      // module: {
      //   rules: [
      //     ,
      //   ],
      // }
    }
  })
}
config.plugin = plugin
config.rule = rule

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

function compiler(webpack=require('webpack')) {  
  return ({config}) => ({
    compiler: webpack(config)
  })
}
compiler.memoryFs = memoryFs

function memoryFs(MemoryFileSystem=require('memory-fs')) {
  return ({compiler}) => {
    const fs = new MemoryFileSystem
    compiler.outputFileSystem = fs
    return {compiler, fs}
  }
}

function watcher(watcher=require('webpack-rx')) {
  return ({compiler}) => ({watcher: watcher(compiler)})
}

function source({fs, watcher, compiler: {outputPath}}) {
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