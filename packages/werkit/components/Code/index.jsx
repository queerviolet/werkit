const Code = module.exports = ({language, children}) =>
  <Lowlight prefix='hljs-light-' className='hljs-inline' language={language} value={src(children)} />

Code.Inline = Code

Code.Block = ({language, children}) =>
  <Lowlight language={language} value={src(children)} />

const Lowlight = require('react-lowlight')
    , js = require('highlight.js/lib/languages/javascript')

require('./atelier-cave-dark.css')
require('./atelier-cave-light.css')

Lowlight.registerLanguage('js', js)
Lowlight.registerLanguage('javascript', js)

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
