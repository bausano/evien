const mongoose = require('mongoose')
const _ = require('lodash/core')

const Schema = mongoose.Schema

const NodeSchema = Schema({
  source:   {type: String, required: true, max: 30},
  module:   {type: String},
  prev:     {type: Schema.Types.ObjectId, ref: 'Node'},
  next:     {type: Schema.Types.ObjectId, ref: 'Node'},
  message:  [{type: Schema.Types.ObjectId, ref: 'Message'}],
  response: [{type: Schema.Types.ObjectId, ref: 'Response'}],
  updated:  {type: Date, default: Date.now},
  created:  {type: Date, default: Date.now}
})

const Node = mongoose.model('Node', NodeSchema)

/*
 * @param   params  Params should follow schema.
 *
 * @return  Promise object
 */
function create(params)
{
 let node = new Node(params)

 return node.save(_errCallBack)
}

/*
 * @param   ids   Can be either array of string IDs or string ID.
 *                Default value 'all' selects all notes.
 *          cb    Callback function.
 *
 * @return  If cb is a function, calls the result of the query on Callback
 *          and returns null, otherwise returns query,
 *          that can be execuded later on.
 */
function read(ids = 'all', cb = false)
{
  let where = {}

  if (_.isString(ids) && ids !== 'all') {
    where = {'_id': mongoose.Types.ObjectId(ids)}
  }

  if (_.isArray(ids)) {
    var typed = []

    for (key in ids) {
      typed.push(mongoose.Types.ObjectId(ids[key]))
    }

    where = {'_id': {$in: typed}}
  }

  let query = Node.
    find(where).
    populate('prev').
    populate('next').
    populate('message').
    populate('response')

  return _exec(query, cb)
}

/*
 * @param   id      String ID of a Node to update.
 * @param   params  Params should follow schema.
 *
 * @return  Promise object
 */
function update(id, params)
{
  return Node.update(
    {'_id': mongoose.Types.ObjectId(id)},
    params
  )
}

/*
 * @param   where   Params for where clausule.
 *                  {
 *                    mins:   Number
 *                    source: String
 *                  }
 * @param   cb      Callback function.
 *
 * @return  If cb is a function, calls the result of the query on Callback
 *          and returns null, otherwise returns query,
 *          that can be execuded later on.
 */
function getLast(where, cb = false)
{
  if (!_.isNumber(where.mins) || !_.isString(where.source)) {
    throw new Exception('Missing or incorrect arguments.')
  }

  let minutes = new Date(new Date() - where.mins*60*1000)

  let query = Node.
    findOne().
    populate('prev', 'updated').
    where('source').equals(where.source).
    // Where Node has been updated in last {where.mins} minutes.
    where('updated').gte(minutes).
    sort('-updated')

  return _exec(query, cb)
}

function _exec(query, cb = false)
{
  // If callback function is not false,
  if (cb) {
    // then executes query and
    query.exec((err, node) => {
      _errCallBack(err)
      // calls the callback on result.
      cb(node)
    })

    return null
  } else {
    // Else returns query that can be executed
    // via  .exec().
    return query
  }
}

function _errCallBack(err)
{
  if (err) {
    Logger.error(err)
  }
}

module.exports = {
  model: Node,
  create: create,
  get: read,
  update: update,
  getLast: getLast
}
