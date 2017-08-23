/*
 * config/index.js
 *
 * Loads .env file to process object and calls all arbitrary config files.
 *
 */

 if (process.env.NODE_ENV === 'development') {
   require('dotenv').config()
 }

const logger = require('./modules/logger.js')
const core = require('./modules/core.js')

module.exports = Object.assign({}, core, logger)
