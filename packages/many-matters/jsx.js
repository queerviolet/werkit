module.exports = toJsxFile

function toJsxFile(matters, params={
  createElement: 'React.createElement',
}) {
  const imports = {}, components = {}
  let nextImportId = 0

  const includes = mmmModule => {
    if (imports[mmmModule]) return imports[mmmModule]
    const id = nextImportId++
    return imports[mmmModule] = {
      id,
      Component: `$MatterComponent${id}`,
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
    import React from 'react'
    import PropTypes from 'prop-types'

    const NotFound = ({mmm}) =>
      <div class='many-minor-matters-malfunction error no-component-found'>
        <h1>{(mmm[0] || {}).type}: Component not found</h1>
        Are you using the right theme?
        <pre>
        {JSON.stringify(mmm, 0, 2)}
        </pre>
      </div>

    class Matter extends React.PureComponent {
       render() {
         return ${jsx}
       }

       getChildContext() {
         return {mmm: Matter.mmm}
       }
    }
    `

  const decl = asComponent(
    matters.length === 1
      ? toJsx(matters[0], p)
      : `React.createElement('div', null, ${matters.map(m => toJsx(m, p)).join(',')})`)

  const importStatements = Object.keys(imports)
    .map(mmmModule => {
      const {Component, mmm} = imports[mmmModule]
      return `
        import $Module_${Component} from ${str(mmmModule)};
        const ${Component} =
          typeof $Module_${Component} === 'string'
            ? (text => {
              const component = props => {
                const {$Text='div'} = props
                if ($Text === 'div')
                  return React.createElement($Text, null, text)
                return React.createElement($Text, props, text)
              }
              component.mmm = text
              return component
            })($Module_${Component})
            : $Module_${Component};
      
      `
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
  
  if (isComponent(matter.type)) {
    rawProps.mmm = mmmify([matter])
  }

  const propsSrc = formatProps(type, rawProps)
      , childrenSrc = children
          .reduce(mergeLines, [])
          .map(c => toJsx(c, params)).join(',\n')
      , childSrc = childrenSrc ? `, ${childrenSrc}` : ''
      , indent = new Array(matter.indent).fill(' ').join('')
      , typeSrc = componentSrcFor(type)
  return `${indent}${createElement}(${typeSrc}, ${propsSrc} ${childSrc})`
}

function mergeLines(children, child) {
  const lastChild = children[children.length - 1]
  if (typeof lastChild === 'string' && typeof child === 'string')
    return [...children.slice(0, -1), lastChild + child]
  return [...children, child]
}

const str = str => JSON.stringify(str)

const isComponent = type => type && type[0] === type[0].toUpperCase()
const isImport = type => type.startsWith('$')

const componentSrcFor = type => isComponent(type)
  ? isImport(type) ? type : `(this.props.${type} || NotFound)`
  : str(type)

function formatProps(type, props) {
  if (!props) return 'null'  
  return '{' +
    (isComponent(type) ? ['...this.props'] : [])
      .concat(
        Object.keys(props)      
          .map(key => `${str(key)}: ${props[key].toString()}`)
      ).join(', ') +
  '}'
}
