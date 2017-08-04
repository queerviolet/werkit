const voids = require('void-elements')

const Default = module.exports = (tag='span', displayName=`marked.${tag}`) => {
  if  (displayName in Default) return Default[displayName]

  const Component = tag in voids
    ? Void(tag)
    : WithChildren(tag)
  Component.displayName = displayName
  
  return Default[displayName] = Component
}

const WithChildren = Tag => ({attrs={}, children}) =>
  <Tag {...attrs}>{children}</Tag>

const Void = Tag => ({attrs={}}) =>
  <Tag {...attrs} />
