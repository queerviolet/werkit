#!/usr/bin/env node

// Returns shell commands setting up aliases for
// kubo and mmm.
const fs = require('fs')
    , {dirname, join} = require('path')
    , root = dirname(__dirname)
    , aliases = {
      kubo: join(root, 'packages/kubo'),
      mmm: join(root, 'packages/many-matters'),
    }

fs.writeFileSync('.alias', Object.keys(aliases)
    .map(alias => `alias ${alias}="node ${aliases[alias]}"`)
    .join('\n'))

console.log('source .alias')
