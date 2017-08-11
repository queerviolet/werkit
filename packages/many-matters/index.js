const debug = require('debug')('mmm')

const PlainText = '@line'

const matter = ({type=null, props={}, children=[]}={}) => ({
  type,
  props,
  children,
})

function parse(input) {
  const lines = input.toString().split('\n')
      , count = lines.length
      , stack = [{
        indent: 0,
        matters: [],
        current: matter() }]
  let returning = null
  
  for (let i = 0; i != count; ++i) {
    const line = lines[i]
        , top = stack[stack.length - 1]
        , indent = indentOf(line)
    if (returning) {
      top.current.children = [...top.current.children, ...returning]
      returning = null
    }
    if (indent === line.length) {
      // If the line is entirely whitespace, consume it in the current
      // matter.
      top.current.children.push(line.substr(top.indent))
      continue
    }
    if (indent === top.indent) {
      // If we've found a tag, finalize this matter and start a new one
      const tag = parseTag(line)
      if (tag) {
        debug('subsequent:', tag.type)
        if (top.current.tag || top.current.children.length)
          top.matters.push(top.current)
        top.current = matter({
          type: tag.type,
          props: {head: tag.head},
        })
        continue
      }

      // Otherwise, consume this line
      top.current.children.push(line.substr(top.indent))
      continue      
    }
    if (indent > top.indent) {
      // Push if we have a tag
      const tag = parseTag(line)
      if (tag) {
        debug('push:', tag.type, tag.head)        
        stack.push({
          indent,
          matters: [],
          current: matter({
            type: tag.type,
            props: {head: tag.head},
          })})
        continue
      }

      // Otherwise, consume the line.
      top.current.children.push(line.substr(top.indent))
      continue
    }
    if (indent < top.indent) {
      // Pop if we've de-indented
      top.matters.push(top.current)
      returning = top.matters
      debug('pop, returning:', top.matters.map(matter => matter.type))
      stack.pop()

      // Reparse this line.
      --i; continue
    }
  }
  return stack
}

const indentRe = /^\s*/
const indentOf = line => line.match(indentRe)[0].length

const tagLineRe = /^(\s*)@\[([a-zA-Z0-9_\.]+)\](.*)$/
const parseTag = line => {
  const match = line.match(tagLineRe)
  if (!match) return
  const [_match, {length: indent}, type, head] = match
  return {indent, type, head: head.trim()}
}

if (module === require.main) {
  const fs = require('fs')
  console.log(JSON.stringify(parse(fs.readFileSync(process.argv[2])), 0, 2))
}