/*
 * All application endpoints converge in this file
 */
const express = require('express')
const Logger = require('../../modules/logger')

const router = express.Router()

// TODO: Server status message
router.get('/', function (req, res) {
  Logger.note('A GET query to root.');

  res.send('Evien status: running')
})

// TODO: Add admin routes

// TODO: Add chat routes

module.exports = router
