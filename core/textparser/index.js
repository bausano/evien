/*
 * @file    /core/textparser/index.js
 * @version 2.0
 */

const _ = require('lodash/core')
const Logger = require('../../modules/logger')
const commands = require('../../modules/collector')
const rawMessage = require('./helpers/raw-message')
const moduleParser = require('./module-parser')

/*
 * @param   msg    A raw message sent from console, SMS or any other
 *                 input stream.
 *          node   Instance of current node.
 */
function parse(msg, node)
{
  if (!_.isString(msg)) {
    // TODO: Textparser - message is not a string.
    return Logger.error('Textparser: message is not a string.')
  }

  let split = rawMessage(msg)

  const message = {
    raw: msg,
    cmds: split.cmds,
    args: split.args
  }

  moduleParser(message, node)
}

module.exports = parse
