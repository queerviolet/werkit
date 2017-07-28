/**
 * Import a workshop from Learndot.
 */

const workshopId = process.argv[2]
if (!workshopId) {
  console.error(`Usage: node learn.import <workshop-id>`)
  process.exit(1)
}

const learn = require('./learn.')
    , workshop = learn.get(`api/workshops/${workshopId}/concepts`)

// console.log(workshop)
workshop.then(console.log).catch(console.error)
 
