const Logger = require('../logger')

var Todolist = {
  call: (fnc, args) => {
    Logger.success({method: fnc, parameters: args})
  }
}

module.exports = Todolist.call
