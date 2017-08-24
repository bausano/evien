/*
 * Module for code tracking and debugging
 *
 * @wiki https://github.com/bausano/evien/wiki/Logger
 */

// Loads Logger config file.
const config = require('../../config').logger

const Logger = {
  /*
   * Type title contains console colour code and message.
   * Based on env settings logs only types of same or higher level.
   */
  _types: {
    error: {
      title: '[31mError',
      level: 3
    },
    success: {
      title: '[32mSuccess',
      level: 2
    },
    warn: {
      title: '[33mWarning',
      level: 2
    },
    note: {
      title: '[34mNote',
      level: 1
    },
  },

  error: (msg) => {
    Logger._validate(Logger._types.error, msg)

    return false
  },

  success: (msg) => {
    Logger._validate(Logger._types.success, msg)

    return true
  },

  note: (msg) => {
    Logger._validate(Logger._types.note, msg)
  },

  warn: (msg) => {
    Logger._validate(Logger._types.warn, msg)

    return false
  },

  // Checks config allowed level and logs allowed level.
  // If Logger is enabled and levels are ok, prints the message.
  _validate: (type, msg) => {
    if (!config.enabled) {
      return false
    }

    let allowed_level = Logger._types[config.level].level

    if (allowed_level === undefined) {
      throw new Error('Logger module: Unknown level!')
    }

    if (type.level >= allowed_level) {
      return Logger._print(type, msg)
    }

    return false
  },

  _print: (type, msg) => {
    // Gets readable date.
    let date = (new Date()).toUTCString()
    date = /, (.*?) GMT/g.exec(date)[1]

    // Prints header with date and log type.
    console.log('\x1b[1m%s \x1b%s\x1b[0m', date, type.title)

    if (msg === undefined) {
      return false
    }

    // NOTE: consider lodash
    // IF msg is of string or number, prints one line.
    if (typeof msg === 'string' || msg instanceof String || typeof msg === 'number') {
      console.log(msg)

      return true
    }

    // ELSE prints msg as an obj or array.
    for (key in msg) {
      console.log('|  \x1b[1m%s\x1b[0m', key)

      console.log(msg[key])
    }

    return true
  }
}

module.exports = Logger
