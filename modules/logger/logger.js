const config = require('./../../config/modules/logger.js').logger

const Logger = {
  _types: {
    error: {
      title: '[31mError',
      level: 3
    },
    success: {
      title: '[32mSuccess',
      level: 2
    },
    note: {
      title: '[34mNote',
      level: 1
    },
  },

  error: (msg) => {
    Logger._validate(Logger._types.error, msg)
  },

  success: (msg) => {
    Logger._validate(Logger._types.success, msg)
  },

  note: (msg) => {
    Logger._validate(Logger._types.note, msg)
  },

  _validate: (type, msg) => {
    if (!config.enabled) {
      return false
    }

    let allowed_level = Logger._types[config.level].level

    if (allowed_level === undefined) {
      throw new Error('Logger module: Unknown level!')
    }

    if (type.level >= allowed_level) {
      Logger._print(type, msg)
    }
  },

  _print: (type, msg) => {
    let date = (new Date()).toUTCString()
    date = /, (.*?) GMT/g.exec(date)[1]

    console.log('\x1b[1m%s: \x1b%s\x1b[0m', date, type.title)

    if(msg !== undefined) {
      console.log(msg)
    }
  }
}

module.exports = Logger
