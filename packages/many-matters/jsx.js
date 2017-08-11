module.exports = toJsxFile

function toJsxFile(matters) {
  const decl = matters.length === 1
    ? `const Matter = () =>\n${toJsx(matters[0])}`
    : `const Matter = () => <div>\n${matters.map(toJsx)}\n</div>`
  const mmm = `Matter.mmm = ${JSON.stringify(matters, 0, 2)}`
  const exports = `module.exports = Matter`  
  return [decl, mmm, exports].join('\n')
}
toJsxFile.toJsx = toJsx

function tagsUsedIn(matters) {
  const tags = {}
  if (matter.type) tags[matter.type] = true
  if (matter.children) Object.assign(tags, matter.children.map(tagsUsedIn))
  return tags
}

function toJsx(matter, {createElement='React.createElement'}={}) {
  if (typeof matter === 'string') return JSON.stringify(matter)
  if (matter.type === '...') return JSON.stringify(`<<< ${matter.head} >>>`)
  const {type, props: rawProps, children} = matter

  const props = Object.assign(
                  ...Object.keys(rawProps)
                    .map(prop => ({[prop]: jsValue(rawProps[prop])})))
      , propsSrc = formatProps(props)
      , childrenSrc = children.reduce(mergeLines, [])
          .map(toJsx).join(',\n')
      , childSrc = childrenSrc ? `, ${childrenSrc}` : ''
      , indent = new Array(matter.indent).fill(' ').join('')
      , typeSrc = type && type[0] === type[0].toUpperCase() ? type : JSON.stringify(type)
  return `${indent}${createElement}(${typeSrc}, ${propsSrc} ${childSrc})`
}

function mergeLines(children, child) {
  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string' && typeof child === 'string')
    return [...children.slice(0, -1), lastChild + child]
  return [...children, child]
}

function jsValue(value) {
  try {    
    return eval(`(function() { return ${value} })()`)
  } catch (x) {
    return value
  }
}

function formatProps(props) {
  if (!props) return 'null'  
  if (typeof props === 'string') return JSON.stringify(props)
  if (typeof props === 'array') return `[${props.map(formatProps).join(', ')}]`
  if (typeof props === 'object')
    return '{' +
      Object.keys(props)
        .map(key => `${JSON.stringify(key)}: ${formatProps(props[key])}`)
        .join(', ') +
    '}'
  return props.toString()
}

module.exports.jsValue = jsValue