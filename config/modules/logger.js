const Joi = require('joi')

const logger_schema = Joi.object({
  LOGGER_ENABLED: Joi.boolean().truthy('true').falsy('false').default(false),
  LOGGER_LEVEL: Joi.string().valid(['error', 'success', 'note'])
}).unknown()
  .required()

const {error, value: vars} = Joi.validate(process.env, logger_schema)

if (error) {
  throw new Error('Logger config validation error: ' + error.message)
}

const config = {
  logger: {
    enabled: vars.LOGGER_ENABLED,
    level: vars.LOGGER_LEVEL
  }
}

module.exports = config
