const _ = require('lodash/core')
const KeywordsHelper = require('./helpers/keywords')
const tree = require('../../modules/collector')
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
  let cmds = tree[route.module].functions[route.fnc].arguments

  let keys = Object.keys(cmds)

  // If function has no parameters, return empty object.
  route.args = {}

  if (keys.length > 0) {
    route.args = _searchForArgs(cmds, message)
  }

  if (!_.isNumber(route.args)) {
    return _dispatch(route, message, node)
  } else {
    let errors = {
      404: 'text-parser-cant-recognize-param',
      417: 'text-parser-required-param-missing'
    }

    Evien.fails({
      node: node,
      body: {
        ref: errors[route.args],
        args: [
          tree[route.module].functions[route.fnc].beautify,
          tree[route.module].beautify]}
    })

    return route.args
  }
}

function _dispatch(route, message, node)
{
  let callback = tree[route.module].callback

  // Calls the appropriate function in matched module with exported arguments.
  callback(node, route.fnc, route.args)

  return route
}

function _searchForArgs(cmds, msg)
{
  var couples = {}

  for (let key in msg.cmds) {
    // If there is no argument to bind, abort.
    if (msg.args[key] === undefined) {
      break
    }

    let name = _getArg(cmds, msg.cmds[key])

    if (name !== 404) {
      couples[name] = msg.args[key]
    }
  }

  // If parser did not match any pairs,
  if (Object.keys(couples).length === 0) {
    // then tries to guess one.
    couples = _omitted(cmds, msg)
  }

  return _checkRequired(cmds, couples)
}

/*
 * @param   str   Part of a msg.cmd before argument in the brackets.
 *
 * @return  An argument key string.
 */
function _getArg(cmds, str)
{
  str = _trimString(str).toLowerCase()

  let args = KeywordsHelper(cmds, new Array(str)),
      arg = args.sorted[0]

  if (args.counter[arg] === 0) {
    return 404
  }

  return arg
}

// TODO: This function can be merged with _checkRequired.
function _omitted(cmds, msg)
{
  var argument = new Object()

  for (let key in cmds) {
    var def = key

    if (cmds[key].required) {
      argument[key] = msg.args[0]

      return argument
    }
  }

  if (Object.keys(cmds).length === 1) {
    return argument[def] = msg.args[0]
  }

  return 404
}

function _checkRequired(cmds, couples)
{
  for (let key in cmds) {
    if (cmds[key].required && couples[key] === undefined) {
      couples = 417

      break
    }
  }

  return couples
}

/*
 * @return  Last 4 words of a string.
 */
function _trimString(str)
{
  return str.split(' ').reverse().slice(0, 5).reverse().join(' ')
}

module.exports = get
