const resolve = require('resolve')  
module.exports = module => resolve.sync(module, {
  basedir: __dirname,
  extensions: ['.js', '.json', '.jsx'],
})