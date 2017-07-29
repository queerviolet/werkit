module.exports = function flow(...funcs) {
  return funcs.reduce(flowPair)
}

function flowPair(f, g) {  
  return input => {
    input = Object.assign({}, input, asFunc(f)(input))
    return Object.assign(input, asFunc(g)(input))
  }
}

function asFunc(funcOrValue) {
  return typeof funcOrValue === 'function'
    ? funcOrValue
    : () => funcOrValue
}
