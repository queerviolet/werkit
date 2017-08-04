module.exports =
  function compile(renderer=markdown) {
    return compileNode

    function compileNode(node) {
      const Renderer = renderer(node)
          , {children} = node
          , merged = merge(children)
          , {nodes} = merged
      
      return <Renderer {...node} rawChildNodes={children} node={node} childNodes={nodes}>{
        compileAll(nodes, compileNode)
      }</Renderer>
    }
  }

const mapTags = (map, prefix) => Object.assign(
  ...Object.keys(map)
    .map(type => {
      const Tag = map[type]
      const component = ({children}) => <Tag>{children}</Tag>
      component.displayName = `${prefix}.${type}`
      return {[type]: component}
    })
)

module.exports.mapTags = mapTags

const isFunc = func => typeof func === 'function' && !func.toString().startsWith('class')

const {flatMapDeep} = require('lodash')
// const mergeConsecutive = {html: true, text: true, code: true}

const merge = (siblings=[]) =>
  siblings.reduce((state, child) => state.next(state, child), {
    next: append,
    nodes: []
  })

const compileAll = (nodes, compile) => {
  return flatMapDeep(nodes, compile)
    .map((child, key) => {
      if (React.isValidElement(child))
        return React.cloneElement(child, {key})
      return child
    })
    .filter(x => x)
}

function append(state, next) {
  if (next.type === 'html') return html(state, next)
  const {nodes=[]} = state  
  return {
    next: append,
    nodes: [...nodes, next]
  }
}

const elements = mapTags({
  hint: 'div',
  guide: 'div',
  li: 'li'
})

const tagName = /^<([a-zA-Z0-9\-\.]+)/

// function html(state, next) {
//   const {value} = next
//   if (value.startsWith('</')) {
//     console.log('CLOSING', next)
//     return state
//   }
//   if (value.startsWith('<')) {    
//     const match = next.value.match(tagName)
//     console.log('OPENING', match)
//     if (value.endsWith('/>')) {
//       console.log('SELF_CLOSING', next)
//       return state
//     }
//     return state
//   }
//   throw value
// }

const mergeConsecutive = pred =>
  function merge(state={}, next) {
    const {nodes=[], next: currentState} = state
    if (currentState !== merge) return {
      next: merge,
      nodes: [...nodes, next]
    }
    
    const last = nodes[nodes.length - 1]
        , {mergedFrom=[]} = last
        , head = nodes.slice(0, -1)
    if (pred(next)) return {
      next: merge,
      nodes: [...head, Object.assign({}, last, {
        value: last.value + '\n' + next.value,
        mergedFrom: [...mergedFrom, next],
      })]
    }
    console.log('merge -> append', append(state, next))
    return append(state, next)
  }

const html = mergeConsecutive(({type}={}) => type === 'html' || type === 'code' || type === 'text')
    // , text = mergeConsecutive(({type}={}) => type === 'text')

// window.__merge = merge
// window.test = test
// console.log('test:', merge(test))

// function html(state, next) {
//   const {nodes, value=[]} = state
//   if (next.type === 'html' || next.type === 'code') return {
//     next: html,
//     nodes,
//     value: [...value, next.value],
//   }
//   return append({
//     ...state,
//     nodes: [...nodes, {type: 'html', value: value.join('')}],
//   }, next)
// }