/*
 * @file    /core/textparser/module-parser.js
 * @version 2.0
 */

const KeywordsHelper = require('./helpers/keywords')
const Node = require('../../models/core/node')

var moduleParser = {
  /*
   * @param   commands  See keywords helper.
   * @param   msg       See keywords helper.
   *
   * @return  String name of a module with most keywords matched
   *          or false if no match has been found.
   */
   get: (commands, msg, prev) => {
     let mod = moduleParser._find(commands, msg, prev)

     if (mod) {
       return mod
     } else {
       // TODO: Reponse: module could not be matched.
       return false
     }
   },

  _find: (commands, msg, prev) => {
    let modules = KeywordsHelper(commands, msg),
        counter = modules.counter

    // If no match has been found, aborts.
    if (counter[modules.sorted[0]] === 0) {
      return false
    }

    // If there is a tie in occurence indexes,
    if (counter[modules.sorted[0]] === counter[modules.sorted[1]]) {
      // then looks of the previous node has a module stated.
      if (prev !== undefined && prev.module !== undefined) {
        return prev.module
      }

      // TODO: If the above fails, Evien asks user to be more specific.
      return false
    }

    return modules.sorted[0]
  }
}

module.exports = moduleParser.get
