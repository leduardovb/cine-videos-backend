import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { BaseService } from '../services'
import { BaseController } from '../controllers'
import { LoggerMiddleware } from '../middlewares'

@Module({
  controllers: [BaseController],
  providers: [BaseService],
})
export class BaseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude({ path: '/health-check', method: RequestMethod.GET }).forRoutes('*')
  }
}
