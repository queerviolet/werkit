/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const learn = require('learn.')
    , esformatter = require('esformatter')
esformatter.register(require('esformatter-jsx'))

require('babel-register')
const {default: convert, isRaw} = require('./convert')

function main([_1, _2, workshopId]) {
  if (!workshopId) {
    console.error(`Usage: node learn.import <workshop-id>`)
    process.exit(1)
  }

  learn
    .get(`api/workshops/${workshopId}`)
    .then(async workshop => Object.assign(workshop, {
      concepts: await learn.get(`api/workshops/${workshop._id}/concepts`)
    }))
    .then(convert)
    .then(jsxToSrc)
    .then($ => $(asString).state)
    .then(esformatter.format)
    .then(jsx => `export default${jsx}`)
    .then(console.log)
    .catch(console.error)
}

const {isValidElement, Children} = require('react')
    , {default: displayName} = require('react-display-name')

    , serializer = require('./serializer')
    , {enter, tab: tabBy, popTab, append, asString} = serializer
    , tab = tabBy('')
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

const propsToSrc =
  (props, $) => Object.keys(props)
    .forEach(prop => prop !== 'children' &&
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
      return $ (append(Children.map(value.props.children, child => child.toString()).join('')))
    }
    if (isValidElement(value)) {
      return jsxToSrc(value, $)
    }
    return $ (curly.open) (append(JSON.stringify(value, null, 2))) (curly.close)
  }
  return $
}

const backtickEscape = str => `\`${str.replace(/`/g, '\\`')}\``

if (module === require.main) main(process.argv)