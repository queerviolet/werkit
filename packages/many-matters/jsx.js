module.exports = toJsxFile

function toJsxFile(matters, params={
  createElement: 'React.createElement',
}) {
  const imports = {}
  let nextImportId = 0

  const includes = mmmModule => {
    if (imports[mmmModule]) return imports[mmmModule]
    const id = nextImportId++
    return imports[mmmModule] = {
      id,
      Component: `MatterComponent${id}`,
    }
  }


  const mmmify = matters =>
    '[' + matters.map(mmmifyOne) + ']'

  const mmmifyOne = matter => {
    if (typeof matter === 'string') return str(matter)
    return matter.type === '...'
      ? '...' + includes(matter.head).Component + '.mmm'
      : `{ type: ${str(matter.type)},
          head: ${str(matter.head)},
          props: ${str(matter.props)},
          children: ${mmmify(matter.children)} }`
  }

  const p = Object.assign({}, params, {
    includes,
    mmmify,
    mmmifyOne,
  })

  const asComponent = jsx =>
    `
    import PropTypes from 'prop-types'

    class Matter extends React.PureComponent {
       render() {
         return ${jsx}
       }

       getChildContext() {
         return {mmm: Matter.mmm}
       }
    }`

  const decl = asComponent(
    matters.length === 1
      ? toJsx(matters[0], p)
      : matters.map(m => toJsx(m, p)))

  const importStatements = Object.keys(imports)
    .map(mmmModule => {
      const {Component, mmm} = imports[mmmModule]
      return `import ${Component} from ${str(mmmModule)}`
    })
    .join('\n')

  const mmm = `
  Matter.childContextTypes = {
    mmm: PropTypes.array,
  }
  Matter.mmm = ${mmmify(matters)}`
  const exports = `export default Matter`
  return [str('use strict'), importStatements, decl, mmm, exports].join('\n')
}
toJsxFile.toJsx = toJsx

function toJsx(matter, params) {
  const {includes, mmmify, createElement='React.createElement'} = params
  if (typeof matter === 'string') return str(matter)
  const type = matter.type === '...' ?
          includes(matter.head).Component
          : matter.type
      , {props: rawProps, children} = matter  
      , isComponent = type && type[0] === type[0].toUpperCase()
  
  if (isComponent) {
    rawProps.mmm = mmmify([matter])
  }
  rawProps.foo = "2"

  const propsSrc = formatProps(rawProps)
      , childrenSrc = children
          .reduce(mergeLines, [])
          .map(c => toJsx(c, params)).join(',\n')
      , childSrc = childrenSrc ? `, ${childrenSrc}` : ''
      , indent = new Array(matter.indent).fill(' ').join('')
      , typeSrc = isComponent ? type : str(type)
  return `${indent}${createElement}(${typeSrc}, ${propsSrc} ${childSrc})`
}

function mergeLines(children, child) {
  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string' && typeof child === 'string')
    return [...children.slice(0, -1), lastChild + child]
  return [...children, child]
}

const str = str => JSON.stringify(str)

function formatProps(props) {
  if (!props) return 'null'  
  return '{' +
    Object.keys(props)
      .map(key => `${str(key)}: ${props[key].toString()}`)
      .join(', ') +
  '}'
}
