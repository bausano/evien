/*
 * All application endpoints converge in this file.
 */
const express = require('express')

const Textparser = require('../textparser')
const Node = require('../../models/core/node')

const router = express.Router()

// TODO: Server status message.
router.get('/', (req, res) => {
  res.send('Evien status: running')
})

router.post('/parser', (req, res) => {
  Node.getLast({
    mins: 5,
    source: req.body.from
  }, (last) => {
    var params = {source: req.body.from, module: 'todolist'}

    if (last !== null) {
      params.prev = last._id
    }

    Node.create(params).then((node) => {
      node.populate({
        path: 'prev',
        select: 'module'
      }, () => {
        Textparser(req.body.message, node)
      })
    })
  })

  res.sendStatus(200)
})

// TODO: Add admin routes.

// TODO: Add chat routes.

module.exports = router
