const lazy = require('lazy-rx')

/**
 * @param {object} compiler The WebPack compiler.
 * @param {object} options Options.
 * @param {boolean} [options.source=false] Whether to return source, rather than compile.
 * @return {Promise} A promise resolved with an object of file names mapping to
 * compiled modules.
 */
module.exports = (compiler, options = {}) => lazy(
  function acquire({next, error, complete}) {
    return compiler.watch({}, (err, stats) => {  
      if (err) return error(err)
      if (stats.hasErrors()) {
        const errors = stats.compilation ? stats.compilation.errors : null
        return error(errors)
      }
      next(stats)
    })
  },
  function release({complete}, watcher) {
    watcher.close(complete)
    return null
  }
)