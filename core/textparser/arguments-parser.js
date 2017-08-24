/*
 * At the moment arguments-parser shares some logic with function-parse.
 * tHowever their logic will differ eventually in the future
 * so there is no point in exporting similar code to one function.
 */
const Logger = require('../../modules/logger')

var argumentsParser = {
  get: (commands, msg) => {
    argumentsParser.commands = commands

    if (Object.keys(commands).length === 0) {
      return {}
    }

    return argumentsParser._searchForArgs(msg)
  },

  _searchForArgs: (msg) => {
    const cmds = msg.cmds
    const args = msg.args

    var couples = {}

    for (let key in cmds) {
      if (args[key] === undefined) {
        break
      }

      let name = argumentsParser._getArg(cmds[key])

      if (name !== false) {
        couples[name] = args[key]
      }
    }

    return argumentsParser._checkReqired(couples)
  },

  _getArg: (str) => {
    str = argumentsParser._trimString(str).toLowerCase()

    var commands = argumentsParser.commands

    var keyword_counter = {}

    for (let key in commands) {
      let arg = commands[key]

      keyword_counter[key] = 0

      arg.keywords.forEach((keyword) => {
        if (str.indexOf(keyword) !== -1) {
          keyword_counter[key]++
        }
      })
    }

    let arg = Object.keys(keyword_counter).sort((a,b) => {
      return keyword_counter[b]-keyword_counter[a]
    })[0]

    if (keyword_counter[arg] === 0) {
      return false
    }

    return arg
  },

  _checkReqired: (couples) => {
    let commands = argumentsParser.commands

    for (let key in commands) {
      if (commands[key].required && couples[key] === undefined) {
        couples = false

        break
      }
    }

    return couples
  },

  _trimString: (str) => {
    return str.split(' ').reverse().slice(0, 5).reverse().join(' ')
  }
}

module.exports = {get: argumentsParser.get}
