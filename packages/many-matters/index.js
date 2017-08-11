const debug = require('debug')('mmm')

const PlainText = '@line'

const matter = ({type=null, props={}, children=[], indent=0}={}) => ({
  type,
  props,
  children,
  indent,
})

function parse(input) {
  const lines = input.toString().split('\n')
      , count = lines.length
      , stack = [{
        indent: 0,
        matters: [],
        current: matter() }]
  let returning = null
    , line, top, indent
  
  for (let i = 0; i != count; ++i) {
    line = lines[i]
    top = stack[stack.length - 1]
    indent = indentOf(line)
    handleReturnValue()
    if (indent === line.length) {
      // If the line is entirely whitespace, consume it in the current
      // matter.
      consumeLine()
      continue
    }
    if (indent === top.indent) {
      // If we've found a tag, finalize this matter and start a new one
      const tag = parseTag(line, top.separator)
      if (tag) {
        top.separator = tag.separator
        debug('subsequent:', tag.type)
        endOfTheMatter()
        top.current = matter({
          type: tag.type,
          props: {name: tag.head},
          indent
        })
        continue
      }

      const prop = parseProp(line, top.separator)
      if (prop) {
        top.current.props[prop.key] = prop.value
        continue
      }

      // Otherwise, consume this line
      consumeLine()
      continue      
    }
    if (indent > top.indent) {
      // If a separator has been defined, we consume as ours all lines
      // with deeper indentation.
      // Only try parsing a tag if a separator isn't defined.
      let tag; if (!top.separator && (tag = parseTag(line))) {
        // Push if we have a tag
        debug('push:', tag.type, tag.head, tag.separator)
        stack.push({
          indent,
          matters: [],
          separator: tag.separator,
          current: matter({            
            type: tag.type,
            props: {name: tag.head},
            indent
          })})
        continue
      }

      // Otherwise, consume the line.
      consumeLine()
      continue
    }
    if (indent < top.indent) {
      // When we de-indent, finish the current matter and pop the stack.
      pop()

      // Reparse this line.
      --i; continue
    }
  }

  function consumeLine() {
    top.current.children.push(line.substr(top.indent) + '\n')
  }

  function endOfTheMatter() {
    const kids = top.current.children
    while (kids[kids.length - 1] === '\n')
      // Pop empty lines at the end of matters.
      kids.pop()
    if (top.current.type || top.current.children.length)
      top.matters.push(top.current)
  }

  function pop() {
      endOfTheMatter()
      returning = top.matters
      debug('pop, returning:', top.matters.map(matter => matter.type))
      stack.pop()
      top = stack[stack.length - 1]
  }

  function handleReturnValue() {
    if (returning && top) {
      top.current.children = [...top.current.children, ...returning]
      returning = null
    }
  }

  while (stack.length) {
    pop()
    handleReturnValue()
  }
  
  return returning
}

const indentRe = /^\s*/
const indentOf = line => line.match(indentRe)[0].length

const tagLineRe = /^(\s*)@(-*)\[(['a-zA-Z0-9_\.]+)\](.*)$/
const parseTag = (line, sep) => {
  const match = line.match(tagLineRe)
  if (!match) return
  const [_match, {length: indent}, separator, type, head] = match
  if (sep && separator !== sep) return    
  return {indent, type, head: head.trim(), separator}
}

const propLineRe = /^(\s*)@(-*)\s+([a-zA-Z0-9_\.]+)(.*)$/
const parseProp = (line, sep) => {
  const match = line.match(propLineRe)
  if (!match) return
  const [_match, {length: indent}, separator, key, value] = match
  if (sep && separator !== sep) return    
  return {indent, key, value: value.trim(), separator}
}

if (module === require.main) {
  const fs = require('fs')
      , jsx = require('./jsx')
      , parsed = parse(fs.readFileSync(process.argv[2]))
  console.log(JSON.stringify(parsed, 0, 2))
  console.log(jsx(parse(fs.readFileSync(process.argv[2])), 0, 2))
}