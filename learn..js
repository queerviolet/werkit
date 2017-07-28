'use strict'

const debug = require('debug')('learndot')
    , {homedir} = require('os')
    , {join} = require('path')
    , {readFile, writeFile} = require('fs')
    , {promisify} = require('util')
    , [read, write] = [readFile, writeFile].map(promisify)    
    , axios = require('axios')

module.exports = Object.assign(learnDotApi, learnDotApi())

function learnDotApi({
  baseUrl='https://learn.fullstackacademy.com',
  tokenPath=join(homedir(), '.learn.token'),
  interactive=true,
}={}) {
  const auth = {
    get token() {
      delete auth.token
      auth.token = read(tokenPath)
        .then(buf => buf.toString())
        .catch(error => {
          if (interactive)
            return interactiveLogin(`${baseUrl}/auth/local`, tokenPath)
          throw error
        })
        .catch(error => console.error(error.message))
      return auth.token
    }
  }

  const learn = {}
  for (const method of ['get', 'post']) {
    learn[method] = (method === 'get' || method === 'delete')
      ? path => wrapAxios(path, method)
      : path => (data, ...configs) => wrapAxios(path, method, ifDef(data, {data}), ...configs)
  }
  
  async function wrapAxios(path, method, ...configs) {
    const config = Object.assign(
      {
        url: `${baseUrl}/${path}`,
        headers: {Authorization: `Bearer ${await auth.token}`},
        method,
      },
      ...configs
    )
    debug(path, method, config)
    return await axios(config).then(res => res.data)
  }

  return learn
}

async function interactiveLogin(authUrl, tokenPath) {
  const exists = x => !!x.length
      , isEmail = x => x.indexOf('@') > 0  
  console.log('Please login to learndot.')
  const token = await require('inquirer')
    .prompt([
      {
        name: 'email',
        message: 'Email',
        validate: isEmail,
      },
      {
        name: 'password',
        message: 'Password',
        type: 'password',
        mask: '*',
        validate: exists,
      },
    ])
    .then(data => axios.post('auth/local', {data}))
    .then(({res: {token}}) => token)
  
  await write(tokenPath, token)
  console.log('Learndot token saved to', tokenPath)
  return token
}

function ifDef(value, then=true, els=false) { 
  return typeof value !== 'undefined' ? then : els
}
