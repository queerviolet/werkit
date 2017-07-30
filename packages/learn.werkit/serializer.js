const flow = require('rxquire/flow')

const serializer = module.exports = () => {
  function dispatch(reducer) {
    dispatch.state =
      reducer.call(reducer, dispatch.state, reducer)
    return dispatch
  }
  dispatch.state = start()
  return dispatch
}

const start = flow({
  line: '',
  lines: [],
  indent: '',
  levels: [],
})

const enter = flow(({line, lines, indent}) => ({
  lines: [...lines, line],
  line: indent,
}))

const tab = (by='  ') => flow(({indent, line, levels}) => ({
  line: by + line,
  indent: by + indent,
  levels: [...levels, indent],
}))

const popTab = flow(({levels, indent}) => ({
  levels: levels.slice(0, -1),
  indent: levels[levels.length - 1],
}), enter)

const appender = ({str}, state) => Object.assign({}, state, {
  line: state.line + str
})

const append = (str='') => ({
  call: appender, str
})

const asString = ({lines, line}) => [...lines, line].join('\n')

Object.assign(serializer, {
  start, enter, tab, popTab, append, asString
})