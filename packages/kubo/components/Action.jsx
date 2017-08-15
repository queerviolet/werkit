const React = require('react')

const Markdown = require('./Markdown')
    , slug = require('../slug')

module.exports = ({name, children}) =>
  <div id={slug(name)} data-name={name} className="workshop-action">
    <h3>{name}</h3>
    <Markdown>{children}</Markdown>
  </div>

module.exports.displayName = 'Workshop.Action'