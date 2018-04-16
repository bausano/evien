const express = require('express')
const config = require('../../config')
const bodyParser = require('body-parser')
const Logger = require('../../modules/logger')

const app = express()
const router = require('./router')

// Using middleware to parse a POST response
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// All routes are managed via ./router
app.use('/', router)

app.listen(config.core.port, (err) => {
  if (err) {
    return Logger.error(err)
  }

  Logger.success('Server is running.')
})
