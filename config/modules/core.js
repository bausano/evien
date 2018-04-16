const Joi = require('joi')

const core_scheme = Joi.object({
  PORT: Joi.number().integer(),
  MONGO_SERVER: Joi.string(),
  MONGO_DB: Joi.string(),
  MONGO_USER: Joi.string(),
  MONGO_PASSWORD: Joi.string()
}).unknown()
  .required()

const {error, value: vars} = Joi.validate(process.env, core_scheme)

if (error) {
  throw new Error('Core config validation error: ' + error.message)
}

const config = {
  core: {
    port: vars.PORT,
    mongo: {
      server: vars.MONGO_SERVER,
      db: vars.MONGO_DB,
      user: vars.MONGO_USER,
      password: vars.MONGO_PASSWORD
    }
  }
}

module.exports = config
