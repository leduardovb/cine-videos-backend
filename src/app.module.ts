import { Module } from '@nestjs/common'
import { RestBaseModule } from './common/modules/rest-base.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthenticationModule } from './authentication/authentication.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [RestBaseModule.register(TypeOrmModule), AuthenticationModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
