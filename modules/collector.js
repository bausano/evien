const Logger = require('./logger')

// Register new modules here
const modules = [
]

var commands = {}

try {
  modules.forEach((module) => {
    commands[module] = require('./' + module + '/commands')
  })
} catch (err) {
  Logger.error('Error in loading commands of module! Msg: ' + err.message)
}

module.exports = commands
