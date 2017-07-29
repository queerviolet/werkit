'use strict'

const Module = require('module')
    , {join, resolve: resolveFromCwd} = require('path')
    , webpackRx = require('webpack-rx')
    , defaultConfig = require('./webpack.config.node')
    , MemoryFileSystem = require('memory-fs')

module.exports = createRxquire

if (module === require.main) {
  createRxquire()(process.argv[2])
    .map(module => JSON.stringify(module, 0, 2))
    .subscribe(console.log, console.error)
}

function createRxquire({resolve=resolveFromCwd}={}, pipelines={}) {
  const {
    config=defaultConfig('index.js'),
    compile=mergeFlow(webpack, memoryFs),
    compilation=mergeFlow(watch),
    exports=mergeFlow(source, compileModule('index.js'))
  } = pipelines

  function rxquire(module) {
    const middleware = mergeFlow(config, compile, compilation, exports)
    return middleware({entry: resolve(module)}).exports
  }

  rxquire.use = stage => mw => createRxquire({resolve}, Object.assign({},
    pipelines,
    {[stage]: mergeFlowPair(pipelines[stage], mw)}
  ))

  Object.keys(pipelines)
    .forEach(pipeline => rxquire[pipeline] = rxquire.use('pipeline'))

  return rxquire
}

function mergeFlowPair(f, g) {  
  return input => {
    input = Object.assign({}, input, f(input))
    return Object.assign(input, g(input))
  }
}

function mergeFlow(...funcs) {
  return funcs.reduce(mergeFlowPair)
}

function memoryFs({compiler}) {
  const fs = new MemoryFileSystem
  compiler.outputFileSystem = fs
  return {compiler, fs}
}

function webpack({config, webpack=require('webpack')}) {
  return {compiler: webpack(config)}
}

function watch({compiler, watcher=require('webpack-rx')}) {
  return {compilation: watcher(compiler)}
}

function source({fs, compilation, compiler: {outputPath}}) {
  return {
    source: compilation.map(
      ({compilation: {assets}}) => Object.assign(
          ...Object.keys(assets)
            .map(file => ({
              [file]: fs.readFileSync(join(outputPath, file), 'utf8')
            })))
    )
  }
}

function compileModule(target) {
  return ({
    compiler: {outputPath},
    source,
    outputFile=join(outputPath, target)
  }) => {
    const module = source
      .pluck(target)
      .map(src => {
        const m = new Module()
        m.paths = module.paths
        m._compile(src, outputFile) 
        return m
      })
    const exports = module.pluck('exports')
    return {module, exports}
  }
}