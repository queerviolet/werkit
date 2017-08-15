const React = require('react')

const slug = module.exports = (name='') => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9_\-]/g, '')

module.exports.Link = props =>
  <a {...{...props, href: `#${slug(props.to)}`}}>{props.to}</a>
