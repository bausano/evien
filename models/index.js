const config = require('../config').core
const mongoose = require('mongoose')
const Logger = require('../modules/logger')

mongoose.Promise = global.Promise

mongoose.connect(config.mongo.server + '/' + config.mongo.db)
.then(
  () => {
    var db = mongoose.connection

    db.on('error', () => {
      Logger.error('An error in mongodb connection has occured.')
    })
  },
  (err) => {
    Logger.error(err)
  }
)
