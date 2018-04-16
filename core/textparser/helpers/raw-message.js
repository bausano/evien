/*
 * @file    /core/textparser/helpers/raw-message.js
 * @version 1.0
 */

/*
 * @param   raw   A string message.
 *
 * @return  Object with the args property containing an array of strings
 *          that are in the brackets and the cmds property that contains
 *          an array with the rest of a raw message.
 */
function msgSplit (raw)
{
  let split = raw.split('"')

  let cmds = [],
      args = []

  for (let i = 0; i < split.length; i++) {
    // If the index is even which means that it is not in brackets,
    if(i % 2 === 0) {
      // then push it to the commands array.
      cmds.push(split[i])
    } else {
      // Otherwise push it to the arguments array.
      args.push(split[i])
    }
  }

  return {
    cmds: cmds,
    args: args
  }
}

module.exports = msgSplit
