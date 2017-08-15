/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const fs = require('fs')
    , Promise = require('bluebird')
    , path = require('path')
    , {promisify} = require('util')
    , {join} = require('path')
    , mkdir = promisify(fs.mkdir)
    , writeFile = promisify(fs.writeFile)
    , readFile = promisify(fs.readFile)
    , axios = require('axios')
    , learn = require('learn.')


async function main(argv) {
  program = require('commander')
    .version('0.0.1')
    .usage('[-u] <workshop-id,...|path,...>')
    .option('-u, --update', 'Update an existing dir pulled from learn.')
    .option('-d, --dir [dir]', 'Import into dir', ':title')
    .parse(argv)

  if (!program.args.length) {
    program.outputHelp()
    process.exit(1)
  }

  if (program.update) {
    await Promise.all(program.args.map(id => update(id)))
    return id
  } else {
    return Promise.all(program.args.map(path => fetch(path, program.dir)))
              .then(paths => paths.join('\n'))
  }
}

async function fetch(workshopId, dir) {
  const workshop = await learn.get(`api/workshops/${workshopId}`)
    .then(fetchConcepts)
  
  const assets = convertWorkshop(workshop)
  
  const outputDir = dir.replace(/:title/g, key(workshop.name))
  await mkdir(outputDir)
    .catch(error => error.code === 'EEXIST' || Promise.reject(error))
    .then(() => console.error('created', outputDir))
  
  console.error('wrote assets:', await write(outputDir, assets))
  return outputDir
}

const update = path =>
  readFile(join(path, 'learn.id'))
    .then(id => fetch(id, path))   
    .catch(err => console.error(path, ':', err.message)) 

const fetchConcepts = async workshop =>
  Object.assign(workshop, {
    concepts: await learn.get(`api/workshops/${workshop._id}/concepts`)
  })

function convertWorkshop(workshop) {
  const {_id, name, description, photo_url, artworkUrl=photo_url, concepts} = workshop
  const artFile = artworkUrl && path.basename(artworkUrl)
      , artUrl = artworkUrl && `https://s3.amazonaws.com/learndotresources/${artworkUrl}`
  workshop.artFile = artFile
  return Object.assign({
    'index.kubo': workshopMatter(workshop),
    'learn.id': _id,
    [artFile]: artFile && axios.get(artUrl, {responseType: 'arraybuffer'})
        .then(res => res.data)
  }, ...concepts.map(convertConcept))
}

function convertConcept(concept) {
  return {
    [conceptFile(concept) + '.kubo']: conceptMatter(concept)
  }
}

const conceptFile = ({name}) => key(name)

const include = (indent='  ') => ({name}) => `${indent}@[...] ./${key(name)}`

const workshopMatter = ({_id, name, description, concepts, artFile}) =>
`@[Workshop] ${name}
@  description  ${str(description)}
@  learnDotWorkshopId ${str(_id)}
${artFile ? `@  artwork      require(${str(`./${artFile}`)})\n` : ''}
${indent(concepts.map(include()).join('\n\n'))}
`  
const conceptMatter = ({name, actions, draftMode}) =>
`@[Concept] ${name} ${draftMode ? `\n@  draftMode ${draftMode}` : ''}
${indent(actions.map(actionMatter).join('\n\n'))}`

const actionMatter = ({name, text, draftMode}) =>
`@[Action] ${name} ${draftMode ? `\n@  draftMode ${draftMode}` : ''}
${text}`

const justWs = /^\s*$/
const indent = (str, by='  ') => str.split('\n')
  .map(line => by + line)
  .map(line => line.match(justWs) ? '' : line)
  .join('\n')

const str = val => JSON.stringify(val)

const key = (name='') => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9_\-]/g, '')

const write = (outputDir, assets) =>
  Promise.map(
    Object.keys(assets),
    path => {
      const assetPath = join(outputDir, path)
      return Promise.resolve(assets[path])
              .then(data => writeFile(assetPath, data))
              .then(() => {
                console.error('wrote', assetPath)
                return assetPath
              })
              .catch(err => console.error(path, ':', err.message))
    }
  ).then(() => outputDir)

if (module === require.main) main(process.argv)
  .then(console.log, err => console.error(err))