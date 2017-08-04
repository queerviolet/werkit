const Markdown = require('./Markdown')

console.log('Markdown=', Markdown)

module.exports = ({name, children}) =>
  <div>
    <h3>{name}</h3>
    <Markdown>{children}</Markdown>
  </div>

module.exports.displayName = 'Workshop.Action'