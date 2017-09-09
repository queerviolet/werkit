module.exports = (rootComponentModule, theme) => {
  const rootComponentStr = JSON.stringify(rootComponentModule)
  return `
  import React from 'react'
  import {render} from 'react-dom'
  import { AppContainer } from 'react-hot-loader'
  import App from ${rootComponentStr}
  
  ${themeSrc(theme)}

  const run = Component =>
    render(<AppContainer><Component {...theme} /></AppContainer>, main)
  
  run(App)

  if (module.hot)
    module.hot.accept(${rootComponentStr}, () => run(App))
  `
}

const themeSrc = components => Object.keys(components)
  .map(c =>
    `import ${c} from ${JSON.stringify(components[c])}`)
  .concat(
    `const theme = {`, Object.keys(components).join(','), '}')
  .join('\n')

