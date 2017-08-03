const markdown = require('../markdown')()
    
module.exports = ({name, children}) =>
  <div>
    <h3>{name}</h3>
    {
      React.Children.map(children,
        child => typeof child === 'string'
          ? markdown(child)
          : child)
    }
  </div>

module.exports.displayName = 'Workshop.Action'