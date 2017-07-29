const lazy = require('lazy-rx')

/**
 * @param {object} compiler The WebPack compiler.
 * @return {Observable} An Observable with the compilation stats.
 */
module.exports = (compiler) => lazy(
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