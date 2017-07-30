/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const learn = require('learn.')

function main([_1, _2, workshopId]) {
  if (!workshopId) {
    console.error(`Usage: node learn.import <workshop-id>`)
    process.exit(1)
  }
  
  require('babel-register')
  const convert = require('./convert').default

  learn
    .get(`api/workshops/${workshopId}`)
    .then(async workshop => Object.assign(workshop, {
      concepts: await learn.get(`api/workshops/${workshop._id}/concepts`)
    }))
    .then(convert)
    .then(jsxToSrc)
    .then($ => $(asString).state)
    .then(jsx => console.log(`export default\n${jsx}`))
    .catch(console.error)
}

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
  isInline || $ (enter) (tab)
  childrenToSrc(children, $)
  isInline || $ (popTab)
              $ (end)(append(Component))(gt)
  return $
}

jsxToSrc.inline = {code: true}

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
  case 'number':
  case 'object':
  case 'string':
    if (isValidElement(value)) {
      return jsxToSrc(value, $)
    }
    return $ (curly.open) (append(JSON.stringify(value, null, 2))) (curly.close)
  }
  return $
}

if (module === require.main) main(process.argv)