// const Markdown = require('../markdown')()
const marked = require('marked')
    , rehype = require('rehype')
    , voids = require('void-elements')

class Renderer extends marked.Renderer {
  code(code, language) {
    return `<codeblock language="${language}">${code}</codeblock>`
  }

  codespan(code) {
    const nl = code.indexOf('\n')
    if (nl !== -1) {
      const lang = code.slice(0, nl)
          , rest = code.slice(nl)
      return this.code(rest, lang)
    }
    return super.codespan(code)
  }
}

marked.setOptions({
  renderer: new Renderer
})

function HTML({children}) {
  return <span>{children}</span>
}

const Default = (tag='span') => {  
  const Component = tag in voids
    ? Void(tag)
    : WithChildren(tag)
  Component.displayName = tag
  console.log('tag:', tag, '  component:', Component)
  return Component
}

const WithChildren = Tag => ({props={}, children}) =>
  <Tag {...props}>{children}</Tag>

const Void = Tag => ({props={}}) =>
  <Tag {...props} />


// Syntax highlighting
const Lowlight = require('react-lowlight')
    , js = require('highlight.js/lib/languages/javascript')

require('highlight.js/styles/atelier-cave-dark.css')
Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('javascript', js)


const htmlToJsx = rehype()
  .use(function({tags}) {
    this.Compiler = compile

    function compile(node, key) {
      const {value} = node
      if (value) return value
      const {type, tagName, properties, children} = node
      const Renderer = (tagName && tags[tagName.toLowerCase()]) || Default(tagName)
      const compiledChildren = Renderer in voids
        ? null
        : children && children.map(compile)
      
      return <Renderer tagName={tagName} props={properties} node={node} tagName={tagName} kids={children} key={key}>{
        compiledChildren
      }</Renderer>
    }
  }, {
    tags: {
      html: HTML,
      hint: class Hint extends React.Component {
        render() {
          return <div><h5>{this.props.title}</h5>
          HINT: {this.props.children}</div>
        }
      },
      codeblock: ({props: {language}, children}) =>
        <Lowlight language="js" value={
          React.Children.map(children,
            child => child.toString())
            .join('')
        } />
    }
  })

function compile(markdown) {
  if (typeof markdown !== 'string') return markdown  
  const html = marked(markdown)
  console.log(markdown, html)
  return htmlToJsx.processSync(html).contents
}

function Markdown({children}) {
  return <div> {
    React.Children.map(children, compile)
  } </div>
}

module.exports = ({name, children}) =>
  <div>
    <h3>{name}</h3>
    <Markdown>{children}</Markdown>
  </div>

module.exports.displayName = 'Workshop.Action'