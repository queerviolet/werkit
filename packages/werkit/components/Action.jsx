const Markdown = require('./Markdown')

module.exports = ({name, children}) =>
  <div id={key(name)} className="workshop-action">
    <h3>{name}</h3>
    <Markdown>{children}</Markdown>
  </div>

module.exports.displayName = 'Workshop.Action'

const key = (name='') => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9_\-]/g, '')
module.exports.slug = key
