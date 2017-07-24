/* eslint no-param-reassign: 0 */
const MemoryFileSystem = require('memory-fs')
    , Module = require('module')
    , {join} = require('path')
    , Rx = require('rxjs')

/**
 * @param {object} compiler The WebPack compiler.
 * @param {object} options Options.
 * @param {boolean} [options.source=false] Whether to return source, rather than compile.
 * @return {Promise} A promise resolved with an object of file names mapping to
 * compiled modules.
 */
module.exports = (compiler, options = {}) => {
  let watcher = null
  const subject = new Rx.Subject()
  function stop() {
    if (watcher) {
      watcher.close(() => subject.complete())
      watcher = null
    }
  }

  // Compile to in-memory file system.
  const fs = new MemoryFileSystem();
  compiler.outputFileSystem = fs;
  function start() {
    watcher = compiler.watch({}, (err, stats) => {  
      if (err) return subject.error(err)

      if (stats.hasErrors()) {
        const errors = stats.compilation ? stats.compilation.errors : null
        return subject.error(errors)
      }

      const { compilation } = stats;
      // Get the list of files.
      const files = Object.keys(compilation.assets);
      // Read each file and compile module
      const { outputPath } = compiler;
      subject.next(files.reduce((obj, file) => {
        // Construct the module object
        // Get the code for the module.
        const path = join(outputPath, file);
        const src = fs.readFileSync(path, 'utf8');
        if (options.source) {
          // Add the source to the object.
          obj[file] = src;
        } else {
          const m = new Module();
          m.paths = module.paths;
          // Compile it into a node module!
          m._compile(src, path); // eslint-disable-line no-underscore-dangle
          // Add the module to the object.
          obj[file] = m.exports;
        }
        return obj;
      }, {}))
    })
  }

  let subscribers = 0
  return Rx.Observable.create(obs => {
    subscribers++ || start()
    const subscription = subject.subscribe(obs)
    return () => {
      subscription.unsubscribe()
      --subscribers || stop()
    }
  })
};
