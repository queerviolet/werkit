const remark = require('remark')
    , remarkReact = require('remark-react')
    , Lowlight = require('react-lowlight')
    , js = require('highlight.js/lib/languages/javascript')    
    // , hljs = require('highlight.js')
    , traverse = require('traverse')    
    , renderer = remark().use(remarkdown)
    , render = md => renderer.processSync(md).contents
    // , compile = marksy({
    //   createElement: React.createElement,
    //   elements: {code: ZCode},
    //   highlight(language='javascript', code) {
    //     return <h2>{code}</h2>//hljs.highlight(language, code).value
    //   }
    // })
    // , render = md => compile(md).tree    
    // , ReactMarkdown = require('react-markdown')
    // , render = md =>
    //   <ReactMarkdown source={md}
    //     renderers={

    //     }/>

// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('js', javascript)

require('highlight.js/styles/atelier-cave-dark.css')

Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('javascript', js)

const compileAll = (children=[]) =>
  children.map((child, key) => React.cloneElement(compile(child), {key}))

const rendererForType = {
  inlineCode({value}) {
    return <code>{value}</code>
  },

  code({value}) {
    return <Lowlight language="js" value={value} />
  },

  list: ({
    ordered,
    children,
    List = ordered ? 'ol' : 'li'
  }) => <List>{children}</List>,

  listItem: 'li',
  paragraph: 'p',

  link: ({url, children}) =>
    <a href={url}>{children}</a>,

  text({value}) {
    return <span>{value}</span>
  }
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

const rendererForNode = node => rendererForType[node.type] || debugRenderer

function compile(node) {
  const Renderer = rendererForNode(node)
      , {children} = node
  
  if (typeof Renderer === 'function')
    return Renderer({...node, children: compileAll(children)})
  
  return <Renderer>{compileAll(children)}</Renderer>
}
 
function remarkdown() {
  this.Compiler = compile
}


module.exports = ({name, children}) =>
  <div>
    <h3>{name}</h3>
    {
      React.Children.map(children,
        child => typeof child === 'string'
          ? render(child)
          : child)
    }
  </div>

module.exports.displayName = 'Workshop.Action'