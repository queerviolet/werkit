'use strict'

require('./Workshop.css')

const Concept = require('./Concept')
    , Action = require('./Action')
    , slug = require('../slug'), {Link} = slug

const tree = visible => ({type, props}, key) => {
  if (type === Concept)
    return <Nav.Concept {...props} visible={visible} key={key}><Nav visible={visible}>{props.children}</Nav></Nav.Concept>
  if (type === Action)
    return <Nav.Action {...{...props, children: null}} visible={visible} key={key} />
  return <span>fail</span>
}

const Nav = ({visible={}, children}) =>
  <ul>{React.Children.map(children, tree(visible))}</ul>

Nav.Concept = ({name, children, visible, className=slug(name) in visible ? 'visible' : ''}) =>
  <div className={`nav-concept ${className}`}>
    <h1 className='nav-concept-header'>
      <Link className={`nav-concept-link ${className}`} to={name}/>
    </h1>
    {children}
  </div>

Nav.Action = ({
  name,
  visible,
  className=slug(name) in visible ? 'visible' : ''
}) =>
  <li className={`nav-action ${className}`}>
    <Link className={`nav-action-link ${className}`} to={name} />
  </li>

class Navigator extends React.Component {
  state = {visible: {}}

  componentDidMount() {
    this.query = document.querySelectorAll('[id]')
    window.addEventListener('scroll', this.scheduleUpdate)
    window.addEventListener('resize', this.scheduleUpdate)
    this.scheduleUpdate()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scheduleUpdate)
    window.removeEventListener('resize', this.scheduleUpdate)
  }

  scheduleUpdate = () => this.frameRequest ||
    (this.frameRequest = requestAnimationFrame(this.updateVisible))
  
  updateVisible = () => {
    this.frameRequest = null
    const height = window.innerHeight
    const visibleElementBoxes = Array.from(this.query)
      .map(element => ({
        element,
        box: element.getBoundingClientRect()
      }))
      .filter(({element, box: {top, bottom}}) =>
        top < 0 && bottom > 0 ||
        top > 0 && top < height ||
        bottom > 0 && bottom < height)
      .sort(({box: {top: a}}, {box: {top: b}}) => a - b)

    const visible = visibleElementBoxes
      .reduce((visible, elementBox) => Object.assign(visible, {
        [elementBox.element.id]: elementBox
      }, {}))
    
    const firstVisibleAction = visibleElementBoxes
      .find(({element}) => element.dataset.name)
    console.log(visibleElementBoxes, firstVisibleAction)
    if (firstVisibleAction) {
      const {id} = firstVisibleAction.element
          , {name} = firstVisibleAction.element.dataset
          , hash = `#${id}`
      if (window.location.hash !== hash)
        history.replaceState(null, name, hash)
    }
    this.setState({visible})
  }

  render() {
    return <nav className='workshop'>
      <Nav visible={this.state.visible}>{this.props.children}</Nav>
    </nav>
  }
}

module.exports = ({name, children}) => 
  <div>
    <h1>{name}</h1>
    <Navigator>{children}</Navigator>
    {children}</div>
