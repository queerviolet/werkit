/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const fs = require('fs')
    , {promisify} = require('util')
    , {join} = require('path')
    , mkdir = promisify(fs.mkdir)
    , writeFile = promisify(fs.writeFile)
    , learn = require('learn.')
    , esformatter = require('esformatter')
esformatter.register(require('esformatter-jsx'))

require('babel-register')
const {default: convert, isRaw, rawValue, assets} = require('./convert')

async function main([_1, _2, workshopId]) {
  if (!workshopId) {
    console.error(`Usage: node learn.import <workshop-id>`)
    process.exit(1)
  }

  const jsx = learn
    .get(`api/workshops/${workshopId}`)
    .then(async workshop => Object.assign(workshop, {
      concepts: await learn.get(`api/workshops/${workshop._id}/concepts`)
    }))
    .then(convert)
  
  const indexSrc = jsx
    .then(jsxToSrc)
    .then($ => $(asString).state)
    .then(esformatter.format)
    .then(jsx => `export default${jsx}`)

  const outputDir = (await jsx).key
  await mkdir(outputDir)
    .catch(error => error.code === 'EEXIST' || Promise.reject(error))
  
  return jsx
    .then(assets)
    .then(assets => Object.assign(assets, {'index.jsx': indexSrc}))
    .then(write(outputDir))
}

const write = outputDir => assets => Promise.all(
  Object.keys(assets)
    .map(async path =>
      writeFile(join(outputDir, path), await assets[path])
        .then(() => path))
)



const {isValidElement, Children} = require('react')
    , {default: displayName} = require('react-display-name')

    , serializer = require('./serializer')
    , {enter, tab: tabBy, popTab, append, asString} = serializer
    , tab = tabBy('  ')
    , lt = append('<'), gt = append('>'), end = append('</')
    , eq = append('=')
    , spc = append(' ')
    , curly = {open: append('{'), close: append('}')}

function jsxToSrc({type, props}, $=serializer()) {
  const {children} = props
      , Component = displayName(type)
      , isInline = jsxToSrc.inline[Component]
  
  isInline || $ (enter)
              $ (lt)(append(Component))
  propsToSrc(props, $)
              $ (gt)
  isInline || $ (tab)
  childrenToSrc(children, $)
  isInline || $ (popTab)
              $ (end)(append(Component))(gt)
  return $
}

jsxToSrc.inline = {strong: true, em: true, code: true}
jsxToSrc.suppressProp = {children: true, __assets: true}
const propsToSrc =
  (props, $) => Object.keys(props)
    .forEach(prop => jsxToSrc.suppressProp[prop] ||
      $ (spc) (append(prop)) (eq) (append(propValueToSrc(props[prop]))))

function propValueToSrc(value) {
  switch (typeof value) {
  case 'undefined':
    return '{undefined}'
  case 'function':
    return `{${value.toString()}}`
  case 'string':
    return JSON.stringify(value)
  case 'number':
  case 'object':
  case 'string':
    if (isRaw(value)) {
      return rawValue(value)
    }
    return `{${JSON.stringify(value, null, 2)}}`
  }
}

const childrenToSrc = (children, $) =>
  Children.forEach(children, child => childToSrc(child, $))

function childToSrc(value, $) {
  switch (typeof value) {
  case 'undefined':
    return $
  case 'function':
    return $ (curly.open) (append(value.toString())) (curly.close)
  case 'string':
    if (value.search(/[\{\}<>]/) >= 0)
      return $ (curly.open) (append(backtickEscape(value))) (curly.close)
    return $ (append(value))
  case 'number':
  case 'object':
    if (isRaw(value)) {
      return $ (append(rawValue(value)))
    }
    if (isValidElement(value)) {
      return jsxToSrc(value, $)
    }
    return $ (curly.open) (append(JSON.stringify(value, null, 2))) (curly.close)
  }
  return $
}

const backtickEscape = str => `\`${str.replace(/`/g, '\\`')}\``

if (module === require.main) main(process.argv).then(console.log, console.error)