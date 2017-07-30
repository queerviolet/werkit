import React from 'react'
import remark from 'remark'
import remarkReact from 'remark-react'

const Workshop = ({name, description, artworkUrl, concepts}) =>
  <Workshop {...{name, description}}
    artworkUrl={`https://s3.amazonaws.com/learndotresources/${artworkUrl}`}>{
      concepts.map(Concept)
  }</Workshop>

const Concept = ({name, actions, draftMode}) =>
  <Concept {...{name}} key={key(name)}>{
    actions.map(Action)
  }</Concept>

const Action = ({name, text}) =>
  <Action {...{name}} key={key(name)}>{markdown(text)}</Action>

const key = name => name
  .toLowerCase()
  .replace(/\s+/g, '-')

const renderer = remark().use(remarkReact, {
})
const markdown = text => renderer.processSync(text).contents

export default Workshop