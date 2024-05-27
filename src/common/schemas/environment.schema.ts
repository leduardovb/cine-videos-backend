import * as Joi from 'types-joi'
import { GenericEnvironmentSchema } from './generic-environment.schema'
import { DatabaseEnvironmentSchema } from './database-environment.schema'

export const EnvironmentSchema = Joi.object({
  ...GenericEnvironmentSchema,
  ...DatabaseEnvironmentSchema,
})
