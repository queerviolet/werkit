const marked = require('marked')
    , rehype = require('rehype')
    , Default = require('./Default')

const {default: serialize} = require('serialize-jsx')
const Markdown = module.exports = function Markdown({
  tags=require('./tags'),  
  Root='div',
  compiler=compile(tags),
  children
}) {
  return <Root>{React.Children.map(children, compiler)}</Root>
}

const compile = tags => {
  const compiler = rehype().use(htmlToJsx, {tags})  
  return md => {
    console.log(marked.lexer(md))
    return compiler.processSync(marked(md)).contents
  }
}

Markdown.Renderer = class Renderer extends marked.Renderer {
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
  renderer: new Markdown.Renderer
})

function HTML({children}) {
  return <span>{children}</span>
}

function htmlToJsx({tags}) {
  this.Compiler = compile

  function compile(node, key) {
    const {value} = node
    if (value) return value

    const {tagName, properties={}, children} = node
    const Renderer = (tagName && tags[tagName.toLowerCase()]) || Default(tagName)

    return <Renderer
      attrs={{
        ...properties,
        style: null,
      }}
      node={node}
      key={key}>{children && children.map(compile)}</Renderer>
  }
}
