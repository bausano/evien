const _ = require('lodash/core')

/*
 * @params  cmds  Has to contain keywords that holds an array of either
 *                strings or Objects with word and bonus property.
 * @params  msg   An array that contains command part of a message. It is
 *                a property cmd returned by raw-message-parser.
 *
 * @return  Object with counter property, which holds the occurence indexes
 *          and sorted array of cmds by keywords.
 */
function sortByKeywords(cmds, msg)
{
  // Forges a string from the message again.
  const formated = msg.join('%arg').toLowerCase()

  var keyword_counter = {}

  for (key in cmds) {
    let cmd = cmds[key]

    keyword_counter[key] = 0

    cmd.keywords.forEach((keyword) => {
      if (_.isString(keyword) && formated.indexOf(keyword) !== -1) {
        keyword_counter[key]++
      } else if (formated.indexOf(keyword.word) !== -1) {
        keyword_counter[key] += keyword.bonus
      }
    })
  }

  // Sorts cmds from the higher occurence index to the lowest one
  // and returns them in an array.
  let sorted = Object.keys(keyword_counter).sort((a,b) => {
    return keyword_counter[b] - keyword_counter[a]
  })

  return {
    counter: keyword_counter,
    sorted: sorted
  }
}

module.exports = sortByKeywords
