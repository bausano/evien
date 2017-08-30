/*
 * config/index.js
 *
 * Loads .env file to process object and calls all arbitrary config files.
 *
 */

require('dotenv').config()

const logger = require('./modules/logger.js')
const core = require('./modules/core.js')

module.exports = Object.assign({}, core, logger)
