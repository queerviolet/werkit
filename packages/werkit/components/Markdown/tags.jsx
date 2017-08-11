'use strict'

const Default = require('./Default')

module.exports = {
  html: Default('span', 'marked.html'),
  head: Default('span', 'marked.head'),
  body: Default('span', 'marked.body'),
  hint: class Hint extends React.Component {
    state = {open: false}

    get title() { return this.props.attrs.title }
    get open() { return this.state.open }

    toggle = () => this.setState({open: !this.open})

    render() {
      return <div className='hint'>
        <h1 onClick={this.toggle}>{this.title}</h1>
        {this.open && <div>{this.props.children}</div>}
      </div>
    }
  },
  code: require('../Code').Inline,
  codeblock: require('../Code').Block,
  h1: Default('h3', 'marked.h1'),
  h2: Default('h4', 'marked.h2'),
  h3: Default('h5', 'marked.h3'),
}
