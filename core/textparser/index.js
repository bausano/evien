/*
 * @file    /core/textparser/index.js
 * @version 1.0
 */

const Logger = require('../../modules/logger')
const commands = require('../../modules/collector')
const _ = require('lodash/core')

// Processing the message starts with spliting the raw message.
const rawMessage = require('./helpers/raw-message')
// Then module gets parsed.
const moduleParser = require('./module-parser')
// If a module was matched, function gets parsed.
const functionParser = require('./function-parser')
// If a function was matched, arguments get exported.
const argumentsParser = require('./arguments-parser')

/*
 * @param   msg    A raw message sent from console, SMS or any other
 *                 input stream.
 *          node   Instance of last node stored in database.
 *
 * @return  Boolean of message status.
 */
function parse(msg, node)
{
  if (!_.isString(msg)) {
    return Logger.error('Textparser error: message is not a string.')
  }

  let split = rawMessage(msg)

  const message = {
    raw: msg,
    cmds: split.cmds,
    args: split.args
  }

  var route = {}

  route.module = moduleParser(commands, split.cmds, node.prev)

  if (route.module === false) {
    return Logger.warn('module-parser could not match your message with any module.')
  }

  route.fnc = functionParser(commands[route.module].functions, split.cmds)

  if (route.fnc === false) {
    return Logger.warn('function-parser could not match your message with any function.')
  }

  route.args = argumentsParser(
    commands[route.module].functions[route.fnc].arguments,
    message
  )

  if (route.args === false) {
    // TODO: print which
    return Logger.warn('Arguments-parser could not find required arguments')
  }

  let callback = commands[route.module].callback

  // Calls the appropriate function in matched module with exported arguments.
  return callback(route.fnc, route.args)
}

module.exports = parse
