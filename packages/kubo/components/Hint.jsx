const React = require('react')
const Markdown = require('./Markdown')

module.exports = class Hint extends React.Component {
    state = {open: false}

    get title() { return this.props.attrs ? this.props.attrs.title : this.props.title || this.props.name }
    get open() { return this.state.open }

    toggle = () => this.setState({open: !this.open})

    render() {
      return <div className='hint'>
        <h1 onClick={this.toggle}>{this.title}</h1>
        {this.open && <Markdown>{this.props.children}</Markdown>}
      </div>
    }
  }