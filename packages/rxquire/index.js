'use strict'

const Module = require('module')
    , {resolve: resolveFromCwd} = require('path')
    , webpack = require('./webpack')
    , flow = require('./flow')
    , MemoryFileSystem = require('memory-fs')

module.exports = createRxquire

function main([_0, _1, file]) {
  return createRxquire()(file)
    .map(module => JSON.stringify(module, 0, 2))
    .subscribe(console.log, console.error)
}

function createRxquire({resolve=resolveFromCwd}={}, pipelines={}) {
  pipelines = flow({
    config: flow(webpack.config('index.js')),
    compiler: flow(webpack.compiler(), webpack.compiler.outputFs(new MemoryFileSystem)),
    compilation: flow(webpack.watcher()),
    exports: flow(webpack.source, createRxquire.module.exports('index.js'))
  }, pipelines)()
  
  function rxquire(module) {
    const {config, compiler, compilation, exports} = pipelines || {}
    const middleware = flow(config, compiler, compilation, exports)
    if (Array.isArray(module)) return middleware({entry: module})
    return middleware({entry: resolve(module)})
  }

  rxquire.use = stage => mw => createRxquire({resolve}, Object.assign({},
    pipelines,
    {[stage]: flow(pipelines[stage], mw)}
  ))

  Object.keys(pipelines)
    .forEach(pipeline => rxquire[pipeline] = rxquire.use(pipeline))

  return rxquire
}

function exports(target) {
  return ({source}) => {
    const module = source
      .pluck(target)
      .map(({path, content: src}) => {
        const m = new Module()
        m.paths = module.paths
        m._compile(src, path)
        return m
      })
    const exports = module.pluck('exports')
    return {module, exports}
  }
}
module.exports.module = {exports}

if (module === require.main) main(process.argv)