import * as Joi from 'types-joi'
import { Logger } from './logger.configuration'

export function createEnvironment<T>(environmentSchema: Joi.ObjectSchema<T>): NonNullable<T> {
  if (!environmentSchema || !environmentSchema['_ids'] || !environmentSchema['_ids']['_byKey']) {
    Logger.error('EnvironmentSchema not defined')
    process.exit(1)
  }

  const processEnv = [...environmentSchema['_ids']['_byKey']].reduce((acc, it) => {
    acc[it[0]] = process.env[it[0]]
    return acc
  }, {})
  const envs: T = Joi.attempt(processEnv, environmentSchema)
  return envs as NonNullable<T>
}
