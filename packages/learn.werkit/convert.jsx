import React from 'react'

const Workshop = ({name, description, artworkUrl, concepts}) =>
  <Workshop {...{name, description}}
    artworkUrl={`https://s3.amazonaws.com/learndotresources/${artworkUrl}`}>{
      concepts.map(Concept)
  }</Workshop>

const Concept = ({name, actions, draftMode}) =>
  <Concept {...{name}}>{
    actions.map(Action)
  }</Concept>

const Action = ({name, text}) =>
  <Action {...{name}}>{text}</Action>

export default Workshop