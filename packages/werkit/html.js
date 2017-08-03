const voidElements = require('void-elements')
    , rehype = require('rehype')
    , html = ({renderers=html.renderers}={}) => node =>
        renderers[node.type] || debugRenderer

html.renderers = {
  // root() { return <h1>hi</h1> },
  element: ({tagName: Tag, properties, children=[]}) => {
    if (Tag.toLowerCase() === 'guide') {
      return <div>
        <input type='checkbox' />
        <strong>{children}</strong>
      </div>
    }
    if (voidElements[Tag]) return <Tag />

    return <Tag>{children}</Tag>
    // if (Tag === 'html') Tag = 'div'
    // if (Tag in {'img': true, 'br': true}) {
    //   return <Tag {...properties} />
    // }
    // console.log(Tag, properties, children)
    // return <pre>{React.Children.map(children, child => child.type)}</pre>
  },

  text: ({value}) => renderInlineMarkdown(value),
}

function debugRenderer(node) {
  const {type, children=[], position, value=''} = node    
  return <div style={{
    margin: '9px',
    padding: '9px',
    border: 'thin solid black'}}>
    <pre style={{
      backgroundColor: '#a0a',
      padding: '9px',      
      color: 'white'
    }}>{node.type}: {JSON.stringify(Object.keys(node), 0, 2)}</pre>    
    {children}
  </div>
}

