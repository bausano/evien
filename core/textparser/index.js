const Logger = require('../../modules/logger')
const commands = require('../../modules/collector')

// Process:
const rawMessageParser = require('./raw-message-parser')
// -->
const moduleParser = require('./module-parser')
// -->
const functionParser = require('./function-parser')

var Textparser = {
  _msg: {},

  parse: (msg) => {
    // NOTE: consider lodash
    if (!typeof msg === 'string' && !msg instanceof String) {
      return Logger.error('Textparser error: message is not a string')
    }

    let split = rawMessageParser.get(msg)

    Textparser._msg = {
      raw: msg,
      cmds: split.cmds,
      args: split.args
    }

    let route = {}

    route.module = moduleParser.get(split.cmds)

    if (route.module === false) {
      return Logger.warn('Module parser could not match a message with any module.')
    }

    route.fnc = functionParser.get(commands[route.module].functions, split.cmds)

    Logger.note({
      module: route.module,
      fnc: route.fnc
    })
  }
}

module.exports = Textparser
