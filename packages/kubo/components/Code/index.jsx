const React = require('react')

const Code = module.exports = ({language, children}) =>
  language in languages?
    <Lowlight prefix='hljs-light-' className='hljs-inline' language={language} value={src(children)} />
    : <Lowlight prefix='hljs-light-' className='hljs-inline' value={src(children)} />

Code.Inline = Code

Code.Block = ({name, language=fileExt(name), children}) =>
  <div>
    <header className='code-head'>{name}</header>
    { language in languages?
      <Lowlight language={language} value={src(children)} />
      : <Lowlight value={src(children)} /> }
  </div>

const fileExt = (filename='') =>
  (filename.match(/\.(\w+)/) || [,filename])[1]

const Lowlight = require('react-lowlight')
    , js = require('highlight.js/lib/languages/javascript')
    , py = require('highlight.js/lib/languages/python')
    , m = require('highlight.js/lib/languages/objectivec')
    , md = require('highlight.js/lib/languages/markdown')
    , css = require('highlight.js/lib/languages/css')
    , languages = {
      css,

      js,
      es: js,
      javascript: js,
      jsx: js,

      m, objc: m, 'objective-c': m,
      md, markdown: md,
      py, python: py,
    }
require('./atelier-cave-dark.css')
require('./atelier-cave-light.css')

for (const language in languages)
  Lowlight.registerLanguage(language, languages[language])

const source = Symbol()
const src = children =>
  React.Children.map(children, child => child.toString())
      .join('')

// const {default: serialize} = require('serialize-jsx')
// console.log('serialize:', serialize)
// String.prototype[source] = String.prototype.toString
// Object.prototype[source] = function toSource() {
//   if (React.isValidElement(this)) {
//     return serialize(this)
//   }
//   return this.toString()
//   // if (this.props && this.props.node.tagName) {
//   //   return tagName
//   // }
//   // console.log('source:', this)
//   // return 'xyzxyz'
//   // return JSON.stringify(this, 0, 2)
// }
