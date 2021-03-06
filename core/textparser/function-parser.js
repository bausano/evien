const _ = require('lodash/core')
const KeywordsHelper = require('./helpers/keywords')
const tree = require('../../modules/collector')
const argumentsParser = require('./arguments-parser')
const Evien = require('../stdout')

/*
 * @param   route     Has property: module.
 * @param   message   Has properties: raw, args, cmds.
 * @param   node      See Node model schema.
 *
 * @return  On error returns error id, otherwise bubbles route object.
 */
function get(route, message, node)
{
  let fnc = _find(route, message.cmds)

  if (_.isString(fnc)) {
    route.fnc = fnc

    return argumentsParser(route, message, node)
  } else {
    if (fnc === 404) {
      Evien.fails({
        node: node,
        body: {
          ref: 'textparser-cant-find-function',
          args: [tree[route.module].beautify]}
      })
    }

    if (fnc === 300) {
      // TODO: If the above fails, Evien asks user to be more specific.
    }

    return fnc
  }
}

function _find(route, message)
{
  let fncs = KeywordsHelper(tree[route.module].functions, message),
      counter = fncs.counter

  if (counter[fncs.sorted[0]] === 0) {
    return 404
  }

  if (counter[fncs.sorted[0]] === counter[fncs.sorted[1]]) {
    console.log('functionParser: 300')
    console.log(counter)
    return 300
  }

  return fncs.sorted[0]
}

module.exports = get
