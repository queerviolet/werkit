const remark = require('remark')
    , compile = require('./compile')
    
    // Syntax highlighting
    , Lowlight = require('react-lowlight')
    , js = require('highlight.js/lib/languages/javascript')

require('highlight.js/styles/atelier-cave-dark.css')
Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('javascript', js)

module.exports = options => {
  const compiler = remark()
    .use(plugin, options)
  return md => compiler.processSync(md).contents
}

Object.assign(module.exports, {plugin, markdown})

function plugin(options) {
  this.Compiler = compile(markdown(options))
}

const markdown =
  ({renderers=markdown.block}={}) => node =>
    renderers[node.type] || debugRenderer

markdown.block = {
  inlineCode({value}) {
    return <code>{value}</code>
  },

  code({value}) {
    return <Lowlight language="js" value={value} />
  },

  root: 'span',

  list: ({
    ordered,
    children,
    List = ordered ? 'ol' : 'ul'
  }) => <List>{children}</List>,

  listItem: 'li',
  strong: 'b',
  paragraph: 'p',
  emphasis: 'strong',

  link: ({url, children}) =>
    <a href={url}>{children}</a>,

  text: ({value}) =>
    <span>{value}</span>,
  
  html: ({type, value}) => 
    <div>
      <pre>{value}</pre>
      {/*{renderHtml(value)}*/}
    </div>,

  heading: ({depth, children, Component=`h${2 + depth}`}) =>
    <Component>{depth}: {children}</Component>,
}

markdown.inline = {
  ...markdown.block,
  root: 'span',
  paragraph: 'span'
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

