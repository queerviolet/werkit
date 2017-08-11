module.exports = class Hint extends React.Component {
    state = {open: false}

    get title() { return this.props.attrs ? this.props.attrs.title : this.props.title }
    get open() { return this.state.open }

    toggle = () => this.setState({open: !this.open})

    render() {
      return <div className='hint'>
        <h1 onClick={this.toggle}>{this.title}</h1>
        {this.open && <div>{this.props.children}</div>}
      </div>
    }
  }