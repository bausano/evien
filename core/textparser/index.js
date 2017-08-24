const Logger = require('../../modules/logger')
const commands = require('../../modules/collector')
const _ = require('lodash/core')

// Process:
const rawMessageParser = require('./raw-message-parser')
// -->
const moduleParser = require('./module-parser')
// -->
const functionParser = require('./function-parser')
// -->
const argumentsParser = require('./arguments-parser')

function parse(msg)
{
  if (!_.isString(msg)) {
    return Logger.error('Textparser error: message is not a string.')
  }

  let split = rawMessageParser.get(msg)

  const message = {
    raw: msg,
    cmds: split.cmds,
    args: split.args
  }

  var route = {}

  route.module = moduleParser.get(split.cmds)

  if (route.module === false) {
    return Logger.warn('module-parser could not match your message with any module.')
  }

  // TODO: send route only
  route.fnc = functionParser.get(commands[route.module].functions, split.cmds)

  if (route.fnc === false) {
    return Logger.warn('function-parser could not match your message with any function.')
  }

  // TODO: send route only
  route.args = argumentsParser.get(
    commands[route.module].functions[route.fnc].arguments,
    message
  )

  if (route.args === false) {
    // TODO: print which
    return Logger.warn('Arguments-parser could not find required arguments')
  }

  let callback = commands[route.module].callback

  return callback(route.fnc, route.args)
}

module.exports = parse
