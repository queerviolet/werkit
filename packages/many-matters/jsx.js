module.exports = toJsxFile

function toJsxFile(matters) {
  if (matters.length === 1) {
    return `module.exports = () =>\n${toJsx(matters[0])}`
  }
  return `module.exports = () => <div>\n${matters.map(toJsx)}\n</div>`
}
toJsxFile.toJsx = toJsx

function toJsx(matter, {createElement='React.createElement'}={}) {
  if (typeof matter === 'string') return JSON.stringify(matter)
  if (matter.type === '...') return JSON.stringify(`<<< ${matter.head} >>>`)
  const {type, props: rawProps, children} = matter

  const props = Object.assign(...Object.keys(rawProps)
          .map(prop => {
            try {
              return {[prop]: JSON.parse(rawProps[prop])}
            } catch (_x) {
              return {[prop]: rawProps[prop]}
            }
          }))
      , propsSrc = JSON.stringify(props, 0, 2)
      , childrenSrc = children.reduce(mergeLines, [])
          .map(toJsx).join(',\n')
      , childSrc = childrenSrc ? `, ${childrenSrc}` : ''
      , indent = new Array(matter.indent).fill(' ').join('')
  return `${indent}${createElement}(${type}, ${propsSrc} ${childSrc})`
}

function mergeLines(children, child) {
  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string' && typeof child === 'string')
    return [...children.slice(0, -1), lastChild + child]
  return [...children, child]
}