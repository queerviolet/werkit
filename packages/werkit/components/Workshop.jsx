require('./Workshop.css')

const Concept = require('./Concept')
    , Action = require('./Action')
    , {link} = require('../slug')

const tree = ({type, props}, key) => {
  if (type === Concept)
    return <Nav.Node {...props} key={key}><Nav>{props.children}</Nav></Nav.Node>
  if (type === Action)
    return <Nav.Action {...{...props, children: null}} key={key} />
}

const Nav = ({children}) =>
  <ul>{React.Children.map(children, tree)}</ul>

Nav.Node = ({name, children}) =>
  <div>
    <h2>{link(name)}</h2>
    {children}
  </div>

Nav.Action = ({name}) =>
  <li>{link(name)}</li>

module.exports = ({name, children}) => 
  <div>
    <h1>{name}</h1>
    <nav className='workshop'><Nav>{children}</Nav></nav>
    {children}
  </div>
