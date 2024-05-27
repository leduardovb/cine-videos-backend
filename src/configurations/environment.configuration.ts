import { createEnvironment } from 'src/common/configurations/environment.configuration'
import { EnvironmentSchema } from '../common/schemas/environment.schema'

export const ENVIRONMENT = createEnvironment(EnvironmentSchema)
