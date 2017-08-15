const React = require('react')
const slug = require('../slug')

module.exports = ({name, children}) =>
  <section id={slug(name)}>
    <h1>{name}</h1>
    {children}
  </section>