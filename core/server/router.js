/*
 * All application endpoints converge in this file
 */
const express = require('express')
const parser = require('../textparser')
const Logger = require('../../modules/logger')

const router = express.Router()

// TODO: Server status message
router.get('/', (req, res) => {
  Logger.note('A GET query to root.')

  res.send('Evien status: running')
})

router.post('/parser', (req, res) => {
  Logger.note('A POST query to /parser')

  console.log(req.body)

  res.sendStatus(200)
})

// TODO: Add admin routes

// TODO: Add chat routes

module.exports = router
