import * as Joi from 'types-joi'

export const DatabaseEnvironmentSchema = {
  DB_USER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_DEBUG: Joi.boolean().default(false),
}
