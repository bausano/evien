const _ = require('lodash')
const Phrasebook = require('../../config/phrasebook')
const Node = require('../../models/core/node')
const Response = require('../../models/core/response')

const On = {
  fail: require('./response/fail'),
  ask: require('./response/ask')
}

const Sources = {
  console: require('./api/console/print.js')
}

function fails(response)
{
  response.body = _getBody(response)
  response.text = On.fail(response.body)
  response.type = 'fail'

  _dispatch(response)

  return false
}

function _dispatch(response, node)
{
  let send = Sources[response.node.source](response)

  send.then((result) => {
    if (!result) {
      throw new Exception()
    }

    _save(response)
  }).catch((err) => {
    console.group('stdoutfail')
      console.error('Error:\n', err)
      console.error('Response:\n', response)
    console.groupEnd()
  })
}

function _save(response)
{
  let save = {
    text: response.text,
    body: response.body,
    node: response.node._id
  }

  Response.create(save).then((rspnse) => {
    Node.update(response.node._id, {response: rspnse._id})
  }).catch((err) => {
    console.error(err)
  })
}

function _getBody(response)
{
  if (_.isString(response.body)) {
    return response.body
  }

  var body = Phrasebook[response.body.ref]

  if (!_.isArray(response.body.args)) {
    return body
  }

  for (let key in response.body.args) {
    body = body.replace(
      '%' + (parseInt(key) + 1),
      response.body.args[key])
  }

  return body
}

module.exports = {
  fails: fails
}
