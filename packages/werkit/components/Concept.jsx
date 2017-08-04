const slug = require('../slug')

module.exports = ({name, children}) =>
  <section id={slug(name)}>
    <h2>{name}</h2>
    {children}
  </section>