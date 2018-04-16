const _ = require('lodash')
const Phrasebook = require('../../../config/phrasebook.js'),
      prefix = Phrasebook.fails.prefix,
      suffix = Phrasebook.fails.suffix

function text(body)
{
  body = _.upperFirst(body) + '!'

  return _compose(
    _random('prefix'),
    body,
    _random('suffix'),
  )
}

function _random(type)
{
  if (type === 'prefix') {
    return prefix[Math.floor(Math.random()*prefix.length)]
  }

  return suffix[Math.floor(Math.random()*suffix.length)]
}

function _compose()
{
  var args = []

  for (let key in arguments) {
    args.push(arguments[key])
  }

  return args.join(' ')
}

module.exports = text
