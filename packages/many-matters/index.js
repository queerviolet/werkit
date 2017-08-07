
function parse(input) {
  const lines = input.split('\n')
      , count = lines.length
      , stack = [{indent: 0, matters: []}]
  
  for (let i = 0; i != count; ++i) {
    const line = lines[i]
        , top = stack[stack.length - 1]
        , indent = indentOf(line)
    if (indent > top.indent) {
      // Push if we have a tag
      const tag = parseTag(line)
      if (tag) {
        stack.push({indent, matters: []})
      }
    }
  }
}

const indentRe = /^\s*/
const indentOf = line => line.match(indentRe)[0].length

const tagLineRe = /^(\s*)@\[([a-zA-Z0-9_\.]+)\](.*)$/
const parseTag = line => {
  const match = line.match(tagLineRe)
  if (!match) return
  const [_match, {length: indent}, tag, head] = match
  return {indent, tag, head}
}
