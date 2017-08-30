/*
 * @file    /core/textparser/function-parser.js
 * @version 1.0
 */

const KeywordsHelper = require('./helpers/keywords')

var functionParser = {
  /*
   * @param   commands  See keywords helper.
   * @param   msg       See keywords helper.
   *
   * @return  String name of a function with most keywords matched
   *          or false if no match has been found.
   */
  get: (commands, msg) => {
    let fncs = KeywordsHelper(commands, msg)

    // If no match has been found, abort.
    if(fncs.counter[fncs.sorted[0]] === 0) {
      return false
    }

    // TODO: If two functions keyword counter equals, evien asks user to be more specific

    return fncs.sorted[0]
  }
}

module.exports = functionParser.get
