const Logger = require('../logger')
const Task = require('../../models/todolist')

var Todolist = {
  call: (fnc, args) => {
    Logger.success({method: fnc, parameters: args})

    return Todolist[fnc](args)
  },

  add: (args) => {
    return Task.add(args)
  },

  detail: (args) => {
    return Task.detail(args)
  }
}

module.exports = Todolist.call
