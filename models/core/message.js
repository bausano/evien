var mongoose = require('mongoose')

var Schema = mongoose.Schema

var MessageSchema = Schema(
  {
    raw:      {type: String},
    function: {type: String},
    params:   {type: Schema.Types.Mixed},
    node:     [{type: Schema.Types.ObjectId, ref: 'Node'}],
    updated:  {type: Date, default: Date.now}
    created:  {type: Date, default: Date.now}
  }
)

module.exports = mongoose.model('Message', MessageSchema)
