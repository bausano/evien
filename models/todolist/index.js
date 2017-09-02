const Task = require('./task')
const Logger = require('../../modules/logger')
const Evien = require('../../core/stdout')

function add(node, parameters)
{
  var new_task = new Task(parameters)

  new_task.save((err) => {
    if (err) {
      return Evien.fails({
        node: node,
        body: 'you can only have one Todolist task called ' + parameters.title
      })
    }

    Logger.success('Task successfully saved!')
  })
}

function detail(node, parameters)
{
  let where = {'title': parameters.title}

  Task.findOne(where, 'title description done tag updated', (err, match) => {
    if (err) {
      return Logger.error([
        'There was an error finding your task!',
        err
      ])
    }

    //Logger.success(JSON.stringify(match))
  })

  return true
}

module.exports = {add: add, detail: detail}
