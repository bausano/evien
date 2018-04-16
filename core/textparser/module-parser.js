const _ = require('lodash/core')
const KeywordsHelper = require('./helpers/keywords')
const tree = require('../../modules/collector')
const functionParser = require('./function-parser')
const Evien = require('../stdout')

/*
 * @param   message   Has properties: raw, args, cmds.
 * @param   node      See Node model schema.
 *
 * @return  On error returns error id, otherwise bubbles route object.
 */
function get(message, node)
{
  let mod = _find(message.cmds, node.prev)

  if (_.isString(mod)) {
    let route = {module: mod}

    return functionParser(route, message, node)
  } else {
    if (mod === 404) {
      Evien.fails({
        node: node,
        body: {ref: 'text-parser-cant-find-module'}
      })
    }

    if (mod === 300) {
      // TODO: If the above fails, Evien asks user to be more specific.
      console.log('moduleParser: 300')
    }

    return mod
  }
}

function _find(message, prev)
{
  let modules = KeywordsHelper(tree, message),
      counter = modules.counter

  if (counter[modules.sorted[0]] === 0) {
    return 404
  }

  // If there is a tie in occurence indexes,
  if (counter[modules.sorted[0]] === counter[modules.sorted[1]]) {
    // then looks of the previous node has a module stated.
    if (prev !== undefined && prev.module !== undefined) {
      return prev.module
    }

    return 300
  }

  return modules.sorted[0]
}

module.exports = get
