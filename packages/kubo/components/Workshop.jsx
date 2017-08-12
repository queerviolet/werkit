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
  return
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
    window.addEventListener('scroll', this.scheduleUpdate)
    window.addEventListener('resize', this.scheduleUpdate)
    this.scheduleUpdate()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scheduleUpdate)
    window.removeEventListener('resize', this.scheduleUpdate)
    this.navElementWillUnmount()
  }

  get contentElements() {
    return Array.from(document.querySelectorAll('[id]'))
  }

  get navSections() {
    return Array.from(document.querySelectorAll('.nav-concept.visible,.nav-action.visible'))
  }

  scheduleUpdate = () => this.frameRequest ||
    (this.frameRequest = requestAnimationFrame(this.updateVisible))
  
  updateVisible = () => {
    this.frameRequest = null
    const height = window.innerHeight
    
    const visibleElementBoxes = this.contentElements
      .map(getElementBoxes)
      .filter(boxesInViewport)
      .sort(topToBottom)

    const visible = visibleElementBoxes
      .reduce((visible, elementBox) => Object.assign(visible, {
        [elementBox.element.id]: elementBox
      }, {}), {})
    
    const firstVisibleAction = visibleElementBoxes
      .find(({element}) => element.dataset.name)
    if (firstVisibleAction) {
      const {id} = firstVisibleAction.element
          , {name} = firstVisibleAction.element.dataset
          , hash = `#${id}`
      if (window.location.hash !== hash) {
        history.replaceState(null, name, hash)
        document.title = name
      }
    }
    this.setState({visible}, this.scrollSelf)
  }

  scrollSelf = () =>
    this.navSections.forEach(active =>
      active.scrollIntoView({behavior: 'smooth'}))

  navElementWillScroll = evt => {
    const {scrollTop, scrollHeight, offsetHeight} = evt.currentTarget
        , {deltaY} = evt
    if (scrollTop <= 0 && deltaY < 0 ||
        scrollTop + offsetHeight >= scrollHeight && deltaY > 0) {
      evt.preventDefault()
      return
    }

    window.z = evt.currentTarget
  }

  navElementDidMount = nav => {
    this.navElement = nav
    nav.addEventListener('wheel', this.navElementWillScroll)
  }

  navElementWillUnmount(nav=this.navElement) {
    nav.removeEventListener('wheel', this.navElementWillScroll)
  }

  render() {
    return <nav className='workshop' ref={this.navElementDidMount}>
      <Nav visible={this.state.visible}>{this.props.children}</Nav>
    </nav>
  }
}

const getElementBoxes = element => ({
  element,
  box: element.getBoundingClientRect()
})

const boxesInViewport = ({box: {top, bottom}}) =>
  top < 0 && bottom > 0 ||
  top > 0 && top < window.innerHeight ||
  bottom > 0 && bottom < window.innerHeight

const topToBottom = ({box: {top: a}}, {box: {top: b}}) => a - b

const gradient = `linear-gradient(to bottom,
  rgba(255,255,255,0.75)   0%,
  rgba(255,255,255,1) 100%)`
module.exports = class extends React.Component {
  state = {scrollY: 0}

  componentDidMount() {
    window.addEventListener('scroll', this.didScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.didScroll)
  }

  didScroll = () => this.setState({scrollY: window.scrollY})

  get watermarkStyle() {
    const {scrollY} = this.state
        , {artwork} = this.props
    return {
      background: `${gradient}, url('${artwork}')`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50% 0%',
      width: '100%',
      height: '100%',
      animationDelay: '-' + scrollY + 's',
      animationPlayState: 'paused',
      animationFillMode: 'both',
    }
  }

  render() {
    const {name, children} = this.props 
    return <div className='workshop'>
      <div className='workshop-watermark' style={this.watermarkStyle} />
      <div className='workshop-left'>
        <Navigator>{children}</Navigator>
      </div>
      <div className='workshop-content'>
        <main>    
          <h1>{name}</h1>
          {children}
        </main>
      </div>
    </div>
  }
}
