const debug = require('debug')('mmm:loader')
    , parse = require('.')
    , {dirname} = require('path')
    , jsx = require('./jsx')
    , {promisify} = require('util')
    , fs = require('fs')
    , read = promisify(fs.readFile)

module.exports = load

function load(source) {
  this.cacheable && this.cacheable()
  this.value = source
  return jsx(parse(source))
}
