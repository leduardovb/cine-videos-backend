import { Module } from '@nestjs/common'
import { RestBaseModule } from './common/modules/rest-base.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [RestBaseModule.register(TypeOrmModule)],
  controllers: [],
  providers: [],
})
export class AppModule {}
