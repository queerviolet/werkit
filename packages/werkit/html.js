'use strict'

module.exports = options => {
  const compiler = rehype().use(plugin, options)
  return html => compiler.processSync(html).contents
}

const rehype = require('rehype')
    , voidElements = require('void-elements')
    , Markdown = require('./markdown')()

function plugin(options={}) {
  this.Compiler = compile(options)
}

const debugPink = debugRenderer()
    , debugBlue = debugRenderer('#09a')

const html = ({
  elements=html.elements,
  renderers=html.renderers(elements),
}={}) => node =>
  renderers[node.type] || debugPink

const pass = name => {
  const component = ({children}) => <span>{children}</span>
  component.displayName = name
  return component
}

const {mapTags} = require('./compile')

html.elements = {
  guide: Guide,      
  hint: Hint,    
  ...mapTags({
    html: 'span',
    head: 'span',
    body: 'span',
  })
}

function Guide({children}) {
  return <div>
    <h3>Continue when you have...</h3>
      <label style={{
        display: 'flex',
        border: 'thin solid fuchsia',
        alignItems: 'baseline',
      }}>
        <input type='checkbox' />
        {children}
      </label>
  </div>
}

function Hint({children}) {
  return <div style={{
    background: 'fuchsia', margin: '9px', padding: '9px'
  }}>🤷🏾‍♀️{children}</div>
}

function compile({elements=html.elements}={}) {
  return compileHtmlNode
  function compileHtmlNode(node, key) {
    const {type, children=[]} = node

    if (type === 'root') return children.map(compileHtmlNode)

    // console.log('marking', node.value, Markdown(node.value))
    if (type === 'text') return <Markdown node={node}>{node.value}</Markdown>

    if (type === 'element') {
      const {tagName} = node
          , Tag = elements[tagName] || tagName || 'span'
      const {properties} = node    
      delete properties.style
      if (typeof Tag === 'string' && voidElements[Tag])
        return <Tag key={key} {...properties} />
      return <Tag key={key} {...properties}>{children.map(compileHtmlNode)}</Tag>
    }
  }
}

function debugRenderer(backgroundColor='#a0a') {
  return node => {
    const {type, children=[], position, value=''} = node    
    return <div style={{
      margin: '9px',
      padding: '9px',
      border: 'thin solid black'}}>
      <pre style={{
        backgroundColor,
        padding: '9px',      
        color: 'white'
      }}>{node.type}: {JSON.stringify(Object.keys(node), 0, 2)}</pre>    
      {children}
    </div>
  }
}
