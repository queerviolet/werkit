const parse = require('.')
    , {dirname} = require('path')
    , jsx = require('./jsx')
    , {promisify} = require('util')
    , fs = require('fs')
    , read = promisify(fs.readFile)

module.exports = load

function load(source) {
  const done = this.async()

  const resolve = (file, context) =>
    new Promise((resolve, reject) =>
      this.resolve(context, file, (err, found) => {
        if (err) reject(err)
        this.dependency(found)
        resolve(found)
      }))
  
  const compile = async (file, context, loading={}, source=read(file)) => {
    async function processChild(matter) {
      if (typeof matter === 'string') return matter
      if (matter.type === '...') {
        const path = await resolve(JSON.parse(matter.props.name), context)
        if (path in loading) {
          if (matter.children.length)
            return matter.children
          return parse(error(`Circular dependency: loading ${path} from ${file}`))
        }
        return compile(
          path,
          dirname(path),
          Object.assign({}, loading, {[path]: true}))
      }
      const nestedChildren = matter.children &&
        await Promise.all(matter.children.map(processChild))
          , children = nestedChildren.reduce((a, b) => a.concat(b), []).filter(x => x)
      return Object.assign({}, matter, {children})
    }

    const src = await source
        , linked = parse(src).map(processChild)
        , matters = await Promise.all(linked)
    return matters
  }
  
  this.cacheable && this.cacheable()
  compile(this.resourcePath, this.context, {[this.resourcePath]: true}, source)
    .then(jsx)
    .then(value => this.value = value)
    .then(out => done(null, out))
    .catch(console.error)
}

const error = err =>
`@---[div]
@---  className 'mmm-error'
${err}
`
