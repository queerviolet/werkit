const React = require('react')
const slug = require('../slug')

module.exports = ({name, $Text, children}) =>
  <section id={slug(name)}>
    <h1>{name}</h1>
    <$Text>{children}</$Text>
  </section>