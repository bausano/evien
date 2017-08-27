/*
 * @file    /core/textparser/module-parser.js
 * @version 1.0
 */

const KeywordsParser = require('./helpers/keywords')

var moduleParser = {
  /*
   * @param   commands  See keywords helper.
   * @param   msg       See keywords helper.
   *
   * @return  String name of a module with most keywords matched
   *          or false if no match has been found.
   */
  get: (commands, msg) => {
    let modules = KeywordsParser(commands, msg)

    // If no match has been found, abort.
    if (modules.counter[modules.sorted[0]] === 0) {
      return false
    }

    // TODO: If two modules keyword counter equals, evien asks user to be more specific

    return modules.sorted[0]
  }
}

module.exports = moduleParser.get
