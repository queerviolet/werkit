/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const fs = require('fs')
    , {promisify} = require('util')
    , {join} = require('path')
    , mkdir = promisify(fs.mkdir)
    , writeFile = promisify(fs.writeFile)
    , learn = require('learn.')
    , jsxToSrc = require('serialize-jsx')
    , esformatter = require('esformatter')
esformatter.register(require('esformatter-jsx'))

require('babel-register')
const {default: convert, isRaw, rawValue, assets} = require('./convert')

async function main([_1, _2, workshopId]) {
  if (!workshopId) {
    console.error(`Usage: node learn.import <workshop-id>`)
    process.exit(1)
  }

  const jsx = learn
    .get(`api/workshops/${workshopId}`)
    .then(async workshop => Object.assign(workshop, {
      concepts: await learn.get(`api/workshops/${workshop._id}/concepts`)
    }))
    .then(convert)
  
  const indexSrc = jsx
    .then(jsxToSrc)
    .then(esformatter.format)
    .then(jsx => `export default () => ${jsx}`)

  const outputDir = (await jsx).key
  await mkdir(outputDir)
    .catch(error => error.code === 'EEXIST' || Promise.reject(error))
  
  return jsx
    .then(assets)
    .then(assets => Object.assign(assets, {'index.jsx': indexSrc}))
    .then(write(outputDir))
}

const write = outputDir => assets => Promise.all(
  Object.keys(assets)
    .map(async path =>
      writeFile(join(outputDir, path), await assets[path])
        .then(() => path))
)

if (module === require.main) main(process.argv)
  .then(console.log, err => console.error(err.message))