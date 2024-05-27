import * as Joi from 'types-joi'

export const GenericEnvironmentSchema = {
  ALLOW_ALL_ORIGINS_ON_CORS: Joi.boolean().default(false),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  CACHE_TTL: Joi.number().default(5),
}
