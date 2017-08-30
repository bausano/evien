var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ResponseSchema = Schema(
  {
    node:     [{type: Schema.Types.ObjectId, ref: 'Node'}],
    updated:  {type: Date, default: Date.now}
    created:  {type: Date, default: Date.now}
  }
)

module.exports = mongoose.model('Response', ResponseSchema)
