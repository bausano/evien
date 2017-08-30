const mongoose = require('mongoose')
const _ = require('lodash/core')

const Schema = mongoose.Schema

const NodeSchema = Schema({
  source:   {type: String, required: true, max: 30},
  prev:     {type: Schema.Types.ObjectId, ref: 'Node'},
  next:     {type: Schema.Types.ObjectId, ref: 'Node'},
  module:   {type: String},
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

function read(ids = 'all', cb = false)
{
  let where = {}

  if (_.isString(ids) && ids !== 'all') {
    // NOTE: Consider ids = [ids]
    where = {'_id': mongoose.Types.ObjectId(ids)}
  }

  if (_.isArray(ids)) {
    var typed = []

    for (key in ids) {
      typed.push(mongoose.Types.ObjectId(ids[key]))
    }

    where = {'_id': {$in: typed}}
  }

  let query = Node.find(where).populate('prev')

  return _exec(query, cb)
}

function update(id, params)
{
  params.updated = new Date()

  return Node.update(
    {'_id': mongoose.Types.ObjectId(id)},
    params
  )
}

function getLast(where, cb = false)
{
  // TODO: Where validation
  let minutes = new Date(new Date() - where.mins*60*1000)

  let query = Node.
    findOne().
    populate('prev', 'updated').
    where('source').equals(where.source).
    where('updated').gte(minutes).
    sort('-updated')

  return _exec(query, cb)
}

function _exec(query, cb)
{
  if (cb) {
    query.exec((err, node) => {
      _errCallBack(err)

      cb(node)
    })

    return null
  } else {
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
