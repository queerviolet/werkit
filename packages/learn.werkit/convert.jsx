import React from 'react'
import remark from 'remark-parse'
import unified from 'unified'
import traverse from 'traverse'

const Workshop = ({name, description, artworkUrl, concepts}) =>
  <Workshop {...{name, description}}
    artworkUrl={`https://s3.amazonaws.com/learndotresources/${artworkUrl}`}>{
      concepts.map(Concept)
  }</Workshop>

const Concept = ({name, actions, draftMode}) =>
  <Concept {...{name}} key={key(name)}>{
    actions.map(Action(key(name)))
  }</Concept>

const Action = conceptKey => ({name, text}) => {
  const keyPath = `${conceptKey}-${key(name)}`
  return <Action {...{name}} key={keyPath}><RAW>{'{'}require('./{keyPath}.md'){'}'}</RAW></Action>
}

const RAW = () => {}

export function isRaw(node) {
  return React.isValidElement(node) && node.type === RAW
}

const key = name => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/:/g, '')

export default Workshop