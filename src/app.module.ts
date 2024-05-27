import { Module } from '@nestjs/common'
import { RestBaseModule } from './common/modules/rest-base.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthenticationModule } from './authentication/authentication.module'

@Module({
  imports: [RestBaseModule.register(TypeOrmModule), AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
