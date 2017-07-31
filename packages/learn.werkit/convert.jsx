import path from 'path'

import React from 'react'
import remark from 'remark-parse'
import unified from 'unified'
import traverse from 'traverse'
import axios from 'axios'

const Workshop = ({name, description, artworkUrl, concepts}) => {
  const artFile = path.basename(artworkUrl)
      , artUrl = `https://s3.amazonaws.com/learndotresources/${artworkUrl}`
      , __assets = {
        [artFile]: axios.get(artUrl, {responseType: 'arraybuffer'}).then(res => res.data)
      }
      , workshop = 
        <Workshop key={key(name)} {...{name, description, __assets}}
          artwork={requireRelative(artFile)}>{
            concepts.map(Concept)
        }</Workshop>
  console.log(artUrl)
  return workshop
}

const Concept = ({name, actions, draftMode}) =>
  <Concept {...{name}} key={key(name)}>{
    actions.map(Action(key(name)))
  }</Concept>

const Action = conceptKey => ({name, text}) => {
  const keyPath = `${conceptKey}-${key(name)}`
      , markdownFile = `${keyPath}.md`
      , __assets = {[markdownFile]: text}
      , action =
        <Action {...{name, __assets}} key={keyPath}>
          {requireRelative(markdownFile)}
        </Action>
  return action
}

const RAW = () => {}
export function isRaw(node) {
  return React.isValidElement(node) && node.type === RAW
}

export function rawValue({props: {children}}) {
  return React.Children.map(children, child => child.toString()).join('')
}

export const assets = node => node.props && Object.assign({},
  node.props.__assets,
  ...React.Children.map(node.props.children || [], assets))

// export function assets(node) {
//   React.Children.map(children, )
// }

const requireRelative = path =>
  <RAW>
    {'{'}require('./{path}'){'}'}
  </RAW>

const key = name => name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9_\-]/g, '')

export default Workshop