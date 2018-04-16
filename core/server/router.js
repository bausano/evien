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
  console.log('\x1b[1m\x1b[34mYou\x1b[0m')
  console.log(req.body.message)

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
