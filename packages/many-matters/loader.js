const parse = require('.')
    , jsx = require('./jsx')

module.exports = function(source) {
  this.cacheable && this.cacheable()
  this.value = source
  return jsx(parse(source))
}