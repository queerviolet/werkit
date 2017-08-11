/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const fs = require('fs')
    , path = require('path')
    , {promisify} = require('util')
    , {join} = require('path')
    , mkdir = promisify(fs.mkdir)
    , writeFile = promisify(fs.writeFile)
    , axios = require('axios')
    , learn = require('learn.')


async function main([_1, _2, workshopId]) {
  if (!workshopId) {
    console.error(`Usage: node learn.import <workshop-id>`)
    process.exit(1)
  }

  const workshop = await learn.get(`api/workshops/${workshopId}`)
    .then(fetchConcepts)
  
  const assets = convertWorkshop(workshop)
  
  // const indexSrc = jsx
  //   .then(jsxToSrc)
  //   .then(esformatter.format)
  //   .then(jsx => `export default () => ${jsx}`)

  const outputDir = key(workshop.name)
  await mkdir(outputDir)
    .catch(error => error.code === 'EEXIST' || Promise.reject(error))
    .then(() => console.error('created', outputDir))
  
  console.error('wrote assets:', await write(outputDir, assets))
  return outputDir
}

const fetchConcepts = async workshop =>
  Object.assign(workshop, {
    concepts: await learn.get(`api/workshops/${workshop._id}/concepts`)
  })

function convertWorkshop({name, description, photo_url, artworkUrl=photo_url, concepts}) {
  const artFile = artworkUrl && path.basename(artworkUrl)
      , artUrl = artworkUrl && `https://s3.amazonaws.com/learndotresources/${artworkUrl}`
      
  return {
    'index.kubo': workshopMatter({name, description, concepts, artFile})
    , [artFile]: axios.get(artUrl, {responseType: 'arraybuffer'})
        .then(res => res.data)
  }
}

const workshopMatter = ({name, description, concepts, artFile}) =>
`@[Workshop] ${name}
@  description  ${str(description)}
${artFile ? `@  artwork      require(${str(`./${artFile}`)})\n` : ''}
${concepts.map(conceptMatter).join('\n\n')}
`  

const conceptMatter = ({name, actions, draftMode}) => draftMode
? '' : indent(`@[Concept] ${name}\n${actions.map(actionMatter).join('\n\n')}`, '  ')

const actionMatter = ({name, text}) =>
  indent(`@[Action] ${name}\n${text}`, '    ')

const indent = (str, by='  ') => str.split('\n')
  .map(line => by + line)
  .join('\n')

const str = val => JSON.stringify(val)

const key = (name='') => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9_\-]/g, '')

const write = (outputDir, assets) => Promise.all(
  Object.keys(assets)
    .map(async path =>
      writeFile(join(outputDir, path), await assets[path])
        .then(() => path))
)

if (module === require.main) main(process.argv)
  .then(console.log, err => console.error(err))