/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const learn = require('learn.')

if (module === require.main) {
  const workshopId = process.argv[2]
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
    .then(console.log)
    .catch(console.error)
}

const {isValidElement, Children} = require('react')
const {default: displayName} = require('react-display-name')

function jsxToSrc({type, props}, indent='', indentBy=indent => indent + '  ') {
  const {children} = props
      , Component = displayName(type)
      , childIndent = indentBy(indent)
  return `${indent}<${Component} ${propsToSrc(props)}>
${childrenToSrc(children, childIndent, indentBy)}
${indent}</${Component}>`
}

const propsToSrc =
  props => Object.keys(props)
    .map(prop => prop !== 'children' && `${prop}=${propValueToSrc(props[prop])}`)
    .filter(x => x)
    .join(' ')

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

const childrenToSrc = (children, indent, indentBy) =>
  Children.map(children,
    value => childToSrc(value, indent, indentBy)
  ).filter(x => x)
   .join(`\n`)

function childToSrc(value, indent, indentBy) {
  switch (typeof value) {
  case 'undefined':
    return
  case 'function':
    return `{${value.toString()}}`
  case 'number':
  case 'object':
  case 'string':
    if (isValidElement(value)) {
      return jsxToSrc(value, indent, indentBy)
    }
    return `{${JSON.stringify(value, null, 2)}}`
  }
}
