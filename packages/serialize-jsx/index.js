/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

// const esformatter = require('esformatter')
// esformatter.register(require('esformatter-jsx'))

export default jsx => jsxToSrc(jsx)(asString).state

const RAW = () => {}
export function isRaw(node) {
  return node.type && node.type === RAW
}

export function rawValue({props: {children=[]}}) {
  if (typeof children === 'string' ||
      !children[Symbol.iterator]) children = [children]
  return children.map(child => child.toString()).join('')
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