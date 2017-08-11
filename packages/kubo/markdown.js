module.exports = function(options) {
  const compiler = remark({gfm: true})
    .use(plugin, options)
      ,  compile = md => compiler.processSync(md).contents
  const component = ({children}) => <div>{
    React.Children.map(children,
      child => typeof child === 'string'
        ? compile(child)
        : child)
  }</div>
  component.displayName = 'Markdown'
  return component
}


const remark = require('remark')
    , compile = require('./compile')
    , html = require('./html')()
    
    // Syntax highlighting
    , Lowlight = require('react-lowlight')
    , js = require('highlight.js/lib/languages/javascript')

require('highlight.js/styles/atelier-cave-dark.css')
Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('javascript', js)

function plugin(options) {
  this.Compiler = compile(markdown(options))
}

const markdown =
  ({renderers=block}={}) => node =>
    renderers[node.type] || debugRenderer

const mapTags = (map, prefix) => Object.assign(
  ...Object.keys(map)
    .map(type => {
      const Tag = map[type]
      const component = ({children}) => <Tag>{children}</Tag>
      component.displayName = `${prefix}.${type}`
      return {[type]: component}
    })
)

const block = {
  inlineCode({value}) {
    return <code>{value}</code>
  },

  code({value}) {
    return <Lowlight language="js" value={value} />
  },

  list: ({
    ordered,
    children,
    List = ordered ? 'ol' : 'ul'
  }) => <List>{children}</List>,

  ...mapTags({
    root: 'span',
    listItem: 'li',
    strong: 'b',
    paragraph: 'p',
    emphasis: 'strong',
  }, 'markdown'),

  link: ({url, children}) =>
    <a href={url}>{children}</a>,

  text: ({value}) =>
    <span>{value}</span>,
  
  html: ({type, value}) => 
    <div>
      <pre>{value}</pre>
      <div className='rendered-html'>
        {html(value)}
      </div>
    </div>,

  heading: ({depth, children, Component=`h${2 + depth}`}) =>
    <Component>{depth}: {children}</Component>,
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