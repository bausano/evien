const Task = require('../../models/todolist')
const Evien = require('../../core/stdout')

var Todolist = {
  call: (node, fnc, args) => {
    return Todolist[fnc](node, args)
  },

  add: (node, args) => {
    return Task.add(node, args)
  },

  detail: (node, args) => {
    return Task.detail(node, args)
  }
}

module.exports = Todolist.call
