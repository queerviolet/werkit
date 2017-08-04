const slug = module.exports = (name='') => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9_\-]/g, '')

module.exports.link = name =>
  <a href={`#${slug(name)}`}>{name}</a>
