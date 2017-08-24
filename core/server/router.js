/*
 * All application endpoints converge in this file
 */
const express = require('express')
const Textparser = require('../textparser')
const Logger = require('../../modules/logger')

const router = express.Router()

// TODO: Server status message
router.get('/', (req, res) => {
  Logger.note('A GET query to root.')

  res.send('Evien status: running')
})

router.post('/parser', (req, res) => {
  var query = Textparser(req.body.message)

  if (query) {
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

// TODO: Add admin routes

// TODO: Add chat routes

module.exports = router
