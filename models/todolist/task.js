var mongoose = require('mongoose')

var Schema = mongoose.Schema

var TaskSchema = Schema(
  {
    title: {type: String, required: true, max: 50, unique: true},
    description: {type: String, max: 255},
    tag: {type: String, max: 20},
    done: {type: Boolean, default: false},
    updated: {type: Date, default: Date.now}
  }
)

module.exports = mongoose.model('Task', TaskSchema)
