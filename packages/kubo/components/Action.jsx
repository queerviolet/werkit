const React = require('react')

const slug = require('../slug')

module.exports = ({name, $Text, children}) =>
  <div id={slug(name)} data-name={name} className="workshop-action">
    <h3>{name}</h3>
    <$Text>{children}</$Text>
  </div>

module.exports.displayName = 'Workshop.Action'