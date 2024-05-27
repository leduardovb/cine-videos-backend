import { DynamicModule, Global } from '@nestjs/common'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthGuard } from '../guards'
import { AuthenticationService } from '../services'
import { BaseModule } from './base.module'
import { DatabaseModule } from './database.module'
import { UserEntity } from '../entities/user.entity'
import { UserTokenEntity } from '../entities/user-token.entity'
import { UserTokenRepository } from '../repositories/user-token.repository'
import { ExceptionDTOFilter, GenericExceptionFilter } from '../filters'
import { ProfileEntity } from '../entities/profile.entity'

const entities = [UserEntity, UserTokenEntity, ProfileEntity]
const repositories = [UserTokenRepository]
const services = [AuthenticationService]
@Global()
export class RestBaseModule {
  static register(typeormModuleClass: typeof TypeOrmModule, options: TypeOrmModuleOptions = {}): DynamicModule {
    return {
      module: RestBaseModule,
      imports: [DatabaseModule(typeormModuleClass, options), typeormModuleClass.forFeature(entities), BaseModule, JwtModule.register({ secret: process.env.JWT_SECRET as string })],
      providers: [
        ...repositories,
        ...services,
        {
          provide: APP_FILTER,
          useClass: GenericExceptionFilter,
        },
        {
          provide: APP_FILTER,
          useClass: ExceptionDTOFilter,
        },
        { provide: APP_GUARD, useClass: AuthGuard },
      ],
      exports: [BaseModule, JwtModule, ...repositories, ...services],
    }
  }
}
