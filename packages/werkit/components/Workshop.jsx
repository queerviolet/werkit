require('./Workshop.css')

const Concept = require('./Concept')
    , Action = require('./Action')

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
    <h2>{name}</h2>
    {children}
  </div>

Nav.Action = ({name}) =>
  <li><a href={`#${Action.slug(name)}`}>{name}</a></li>

module.exports = ({name, children}) => 
<div>
  <h1>{name}</h1>
  <Nav>{children}</Nav>
  {children}
</div>
