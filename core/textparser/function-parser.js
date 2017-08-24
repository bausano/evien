/*
 * At the moment function-parse shares logic with module-parser, but
 * their logic will differ eventually in the future
 * so there is no point in exporting similar code to one function.
 */
const _ = require('lodash/core')
const Logger = require('../../modules/logger')

var functionParser = {
  get: (commands, msg) => {
    let fncs = functionParser._sortByKeywords(commands, msg)

    if(functionParser._counter[fncs[0]] === 0) {
      return false
    }

    // TODO: If two functions keyword counter equals, evien asks user to be more specific

    return fncs[0]
  },

  _sortByKeywords: (fncs, msg) => {
    const formated = msg.join('%arg').toLowerCase()

    var keyword_counter = {}

    for (key in fncs) {
      let fnc = fncs[key]

      keyword_counter[key] = 0

      fnc.keywords.forEach((keyword) => {
        if (_.isString(keyword) && formated.indexOf(keyword) !== -1) {
          keyword_counter[key]++
        } else if (formated.indexOf(keyword.word) !== -1) {
          keyword_counter[key] += keyword.bonus
        }
      })
    }

    functionParser._counter = keyword_counter

    return Object.keys(keyword_counter).sort((a,b) => {
      return keyword_counter[b]-keyword_counter[a]
    })
  }
}

module.exports = {get: functionParser.get}
