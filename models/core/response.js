const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ResponseSchema = Schema(
  {
    node:     [{type: Schema.Types.ObjectId, ref: 'Node'}],
    text:     {type: String, max: 1024},
    type:     {type: String},
    body:     {type: String},
    created:  {type: Date, default: Date.now}
  }
)

const Response = mongoose.model('Response', ResponseSchema)

/*
 * @param   params  Params should follow schema.
 *
 * @return  Promise object
 */
function create(params)
{
 let response = new Response(params)

 return response.save(_errCallBack)
}

function _errCallBack(err)
{
  if (err) {
    Logger.error(err)
  }
}

module.exports = {
  model: Response,
  create: create
}
