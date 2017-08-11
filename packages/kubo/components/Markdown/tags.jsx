'use strict'

const Default = require('./Default')

module.exports = {
  html: Default('span', 'marked.html'),
  head: Default('span', 'marked.head'),
  body: Default('span', 'marked.body'),
  hint: require('../Hint'),
  code: require('../Code').Inline,
  codeblock: require('../Code').Block,
  h1: Default('h3', 'marked.h1'),
  h2: Default('h4', 'marked.h2'),
  h3: Default('h5', 'marked.h3'),
  tonic: require('../Code').Block,
}
