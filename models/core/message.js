const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = Schema(
  {
    raw:      {type: String, max: 16384},
    function: {type: String, max: 30},
    params:   {type: Schema.Types.Mixed},
    node:     [{type: Schema.Types.ObjectId, ref: 'Node'}],
    created:  {type: Date, default: Date.now}
  }
)

const Message = mongoose.model('Message', MessageSchema)

/*
 * @param   params  Params should follow schema.
 *
 * @return  Promise object
 */
function create(params)
{
 let message = new Message(params)

 return message.save(_errCallBack)
}

function _errCallBack(err)
{
  if (err) {
    Logger.error(err)
  }
}

module.exports = {
  model: Message,
  create: create
}
