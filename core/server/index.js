const express = require('express')
const config = require('../../config')
const Logger = require('../../modules/logger')

const app = express()
const router = require('./router')

app.use('/', router)

app.listen(config.core.port, (err) => {
  if (err) {
    return Logger.error(err);
  }

  Logger.success('Server is running.');
})
