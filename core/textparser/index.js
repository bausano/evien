const Logger = require('../../modules/logger')

const commands = require('../../modules/collector')

var Textparser = {
  _msg: {},
  _keyword_counter: {},

  parse: (msg) => {
    // NOTE: consider lodash
    if (!typeof msg === 'string' && !msg instanceof String) {
      return Logger.error('Textparser error: message is not a string')
    }

    Textparser._msg.raw = msg

    Textparser._msgSplit()

    Textparser._keywords()
  },

  _msgSplit: () => {
    let split = Textparser._msg.raw.split('"')

    let cmds = [],
        args = []

    for (let i = 0; i < split.length; i++) {
      if(i % 2 === 0) {
        cmds.push(split[i])
      } else {
        args.push(split[i])
      }
    }

    Textparser._msg.cmds = cmds

    Textparser._msg.args = args
  },

  _keywords: () => {
    var formated = Textparser._msg.cmds.join('%arg')

    for (key in commands) {
      let module = commands[key]

      Textparser._keyword_counter[key] = 0

      module.keywords.forEach((keyword) => {
        // NOTE: consider lodash
        if (formated.indexOf(keyword) !== -1) {
          Textparser._keyword_counter[key]++
        }
      })
    }
  }
}

module.exports = Textparser
