import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Joi from 'types-joi'
import { createEnvironment } from '../configurations/environment.configuration'
import { DatabaseEnvironmentSchema } from '../schemas/database-environment.schema'

export const DatabaseModule = (typeormModule: typeof TypeOrmModule, options: TypeOrmModuleOptions = {}): DynamicModule => {
  return typeormModule.forRootAsync({
    useFactory: async () => {
      const ENVIRONMENT = createEnvironment(Joi.object(DatabaseEnvironmentSchema))
      return {
        type: 'postgres',
        host: ENVIRONMENT.DB_HOST,
        port: Number(ENVIRONMENT.DB_PORT),
        username: ENVIRONMENT.DB_USER,
        password: ENVIRONMENT.DB_PASSWORD,
        database: ENVIRONMENT.DB_NAME,
        autoLoadEntities: true,
        logging: ENVIRONMENT.DB_DEBUG,
        ssl:
          process.env.NODE_ENV == 'development'
            ? false
            : {
                rejectUnauthorized: false,
              },
        ...options,
      }
    },
  } as TypeOrmModuleAsyncOptions) as DynamicModule
}
