const through = require('through2')
    , jsx = require('./jsx')
    , parse = require('.')
    , path = require('path')   
    , globals = {
      React: 'react',
      Code: '../Code/Code.jsx',
      Action: '../Action',
      Target: '../Target',
    }
module.exports = function (file) {  
  if (!(file.endsWith('.kubo') || file.endsWith('.mmm'))) {
    return noop()
  }

  let src = ''
  return through(function data(buf, enc, next) {  
    if (!src) {
      for (const g of Object.keys(globals)) {
        this.push(`import ${g} from ${JSON.stringify(globals[g])}\n`)
      }
    }
    src += buf.toString('utf-8')
    next()
  }, function flush(done) {
    this.push(jsx(parse(src)))
    done()
  })
}

const noop = () => through(function data(buf, enc, next) {
  this.push(buf)
  next()
})
