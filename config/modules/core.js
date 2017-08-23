const Joi = require('joi')

const core_scheme = Joi.object({
  PORT: Joi.number().integer()
}).unknown()
  .required()

const {error, value: vars} = Joi.validate(process.env, core_scheme)

if (error) {
  throw new Error('Core config validation error: ' + error.message)
}

const config = {
  core: {
    port: vars.PORT
  }
}

module.exports = config
