/**
 * Import a workshop from Learndot.
 * 
 * Usage: node learn.import <workshop-id>
 */

const learn = require('./learn.')

if (module === require.main) {
  const workshopId = process.argv[2]
  if (!workshopId) {
    console.error(`Usage: node learn.import <workshop-id>`)
    process.exit(1)
  }
  
  learn
    .get(`api/workshops/${workshopId}`)
    .then(workshopToJsx)
    .then(console.log)
    .catch(console.error)
}

const str = x => JSON.stringify(x)

/**
 * workshopToJsx(workshop) ~> String
 * 
 * Convert a learndot workshop to a JSX string.
 * 
 * @param {_id, name, description, artworkUrl} workshop
 */
async function workshopToJsx({_id: id, name, description, artworkUrl}) {
  const concepts = learn.get(`api/workshops/${id}/concepts`)
  return block `
    export default
    <Workshop
      name=${str(name)}
      description=${str(description)}
      artworkUrl=${str(`https://s3.amazonaws.com/learndotresources/${artworkUrl}`)}>${
        (await concepts).map(conceptToJsx).join('')
    }</Workshop>`
}

function conceptToJsx({name, actions, draftMode}) {
  if (draftMode) return ''
  return block `
    <Concept name=${str(name)}>${
      actions.map(actionToJsx).join('')
    }</Concept>`
}

function actionToJsx({name, text, draftMode}) {
  if (draftMode) return ''
  return block `
    <Action name=${str(name)}>${escape(text)}</Action>`
}

const escape = text => text
  .replace(/(\{|\})/g, "{'$1'}")
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  // .replace(/\}/g, "{'}'}")

// TODO: Make this a tag parser that strips indentation.
const block = String.raw
