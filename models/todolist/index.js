const Task = require('./task')
const Logger = require('../../modules/logger')

function add(parameters)
{
  var new_task = new Task(parameters)

  new_task.save((err) => {
    if (err) {
      return Logger.error([
        'There was an error saving your task!',
        err
      ])
    }

    Logger.success('Task successfully saved!')
  })

  return true
}

function detail(parameters)
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
