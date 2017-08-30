/*
 * @file    /core/textparser/arguments-parser.js
 * @version 1.0
 */
const Logger = require('../../modules/logger')
const KeywordsHelper = require('./helpers/keywords')

var argumentsParser = {
  /*
   * @param   commands  Has to contain keywords that holds an array of either
   *                    strings or Objects with word and bonus property.
   * @param   msg       A product of raw-message helper.
   *
   * @return  Object with a key - value pairs where key is the name of a
   *          parameter.
   */
  get: (commands, msg) => {
    argumentsParser.commands = commands

    let keys = Object.keys(commands)

    // If function has no parameters, return empty object.
    if (keys.length === 0) {
      return {}
    }

    return argumentsParser._searchForArgs(msg)
  },

  _searchForArgs: (msg) => {
    var couples = {}

    for (let key in msg.cmds) {
      // If there is no argument to bind, abort.
      if (msg.args[key] === undefined) {
        break
      }

      let name = argumentsParser._getArg(msg.cmds[key])

      if (name !== false) {
        couples[name] = msg.args[key]
      }
    }

    // If parser did not match any pairs,
    if (Object.keys(couples).length === 0) {
      // then tries to guess one.
      couples = argumentsParser._omitted(msg)
    }

    // Checks if all required arguments have value.
    return argumentsParser._checkRequired(couples)
  },

  /*
   * @param   str   Part of a msg.cmd before argument in the brackets.
   *
   * @return  An argument key string.
   */
  _getArg: (str) => {
    str = argumentsParser._trimString(str).toLowerCase()

    let args = KeywordsHelper(argumentsParser.commands, new Array(str)),
        arg = args.sorted[0]

    if (args.counter[arg] === 0) {
      return false
    }

    return arg
  },

  // TODO: This function can be merged with _checkRequired.
  _omitted: (msg) => {
    const commands = argumentsParser.commands

    var argument = new Object()

    for (let key in commands) {
      // Saves key strings of arguments.
      var def = key

      // If there is a required argument,
      if (commands[key].required) {
        // then returns pair of the argument key with our unrecognized value.
        argument[key] = msg.args[0]

        return argument
      }
    }

    // If there is no required argument, returns pair of the last
    // argument found with our unrecognized value.
    // TODO: Evien asks which argument does the value belong to.
    return argument[def] = msg.args[0]
  },

  _checkRequired: (couples) => {
    const commands = argumentsParser.commands

    for (let key in commands) {
      // If the argument is required, but not found in the message,
      if (commands[key].required && couples[key] === undefined) {
        // then argument-parser returns false.
        couples = false

        break
      }
    }

    return couples
  },

  /*
   * @return  Last 4 words of a string.
   */
  _trimString: (str) => {
    return str.split(' ').reverse().slice(0, 5).reverse().join(' ')
  }
}

module.exports = argumentsParser.get
