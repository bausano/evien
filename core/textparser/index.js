const _ = require('lodash/core')
const rawMessage = require('./helpers/raw-message')
const moduleParser = require('./module-parser')
const Evien = require('../stdout')
const Message = require('../../models/core/message')
const Node = require('../../models/core/node')

/*
 * @param   msg    A raw message sent from console, SMS or any other
 *                 input stream.
 *          node   Instance of current node.
 */
function parse(msg, node)
{
  if (!_.isString(msg)) {
    return Evien.fails({
      node: node,
      body: 'your message has to be text'
    })
  }

  let split = rawMessage(msg)

  const message = {
    raw: msg,
    cmds: split.cmds,
    args: split.args
  }

  let route = moduleParser(message, node)

  if (!_.isNumber(route)) {
    saveMessage(message, route, node)
  }
}

function saveMessage(message, route, node)
{
  let save = {
    raw: message.raw,
    function: route.fnc,
    params: route.args,
    node: node._id
  }

  Message.create(save).then((msg) => {
    Node.update(node._id, {message: msg._id})
  }).catch((err) => {
    console.error(err)
  })
}

module.exports = parse
