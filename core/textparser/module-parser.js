/*
 * At the moment module-parser shares logic with function-parse, but
 * their logic will differ eventually in the future
 * so there is no point in exporting similar code to one function.
 */
const Logger = require('../../modules/logger')
const commands = require('../../modules/collector')

var moduleParser = {
  get: (msg) => {
    let modules = moduleParser._sortByKeywords(msg)

    if (moduleParser._counter[modules[0]] === 0) {
      return false
    }

    // TODO: If two modules keyword counter equals, evien asks user to be more specific

    return modules[0]
  },

  _sortByKeywords: (msg) => {
    const formated = msg.join('%arg')

    var keyword_counter = {}

    for (key in commands) {
      let mod = commands[key]

      keyword_counter[key] = 0

      mod.keywords.forEach((keyword) => {
        if (formated.indexOf(keyword) !== -1) {
          keyword_counter[key]++
        }
      })
    }

    moduleParser._counter = keyword_counter

    return Object.keys(keyword_counter).sort((a,b) => {
      return keyword_counter[b]-keyword_counter[a]
    })
  }
}

module.exports = {get: moduleParser.get}
